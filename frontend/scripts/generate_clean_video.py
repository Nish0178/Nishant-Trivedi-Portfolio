import cv2
import numpy as np

def generate_clean_video():
    input_video = "public/video/hero-walking.mp4"
    output_video = "public/video/hero-walking-clean.mp4"
    
    cap = cv2.VideoCapture(input_video)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"Generating clean video from {input_video}: {w}x{h} @ {fps}fps, {total_frames} frames")
    
    out_w, out_h = 720, 1280
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video, fourcc, fps, (out_w, out_h))
    
    bg_color = np.array([7, 7, 7], dtype=np.uint8) # #070707
    
    prev_mask = None
    last_frame = None
    frame_idx = 0
    
    # Kernel definitions for clean morphology
    kernel_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    kernel_open = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        frame_resized = cv2.resize(frame, (out_w, out_h), interpolation=cv2.INTER_AREA)
        
        hsv = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2HSV)
        lab = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2LAB)
        gray = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2GRAY)
        
        # Studio background wall: high lightness, low chroma
        # Person / Chair: face skin (H ~ 5-25, S > 40), navy pants (H ~ 100-130, S > 30), blazer (texture/lower L), chair (brown leather)
        is_wall = (
            (hsv[:, :, 2] > 155) & 
            (hsv[:, :, 1] < 50) & 
            (np.abs(lab[:, :, 1].astype(np.int32) - 128) < 16) & 
            (np.abs(lab[:, :, 2].astype(np.int32) - 128) < 16)
        )
        is_black_pillar = (gray < 22)
        
        # Foreground contains person and chair
        fg_raw = (~is_wall) & (~is_black_pillar)
        fg_u8 = (fg_raw.astype(np.uint8) * 255)
        
        # Close holes in jacket, white shirt, face
        fg_closed = cv2.morphologyEx(fg_u8, cv2.MORPH_CLOSE, kernel_close)
        fg_clean = cv2.morphologyEx(fg_closed, cv2.MORPH_OPEN, kernel_open)
        
        # Keep only connected components near the center (person & chair)
        num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(fg_clean)
        mask_filtered = np.zeros_like(fg_clean)
        for lbl in range(1, num_labels):
            area = stats[lbl, cv2.CC_STAT_AREA]
            cx, cy = centroids[lbl]
            # Discard small floating noise
            if area > 1200 and (0.15 * out_w < cx < 0.85 * out_w):
                mask_filtered[labels == lbl] = 255
                
        # Temporal smoothing with previous frame to eliminate flicker
        curr_mask = mask_filtered.astype(np.float32) / 255.0
        if prev_mask is not None:
            curr_mask = 0.7 * curr_mask + 0.3 * prev_mask
        prev_mask = curr_mask.copy()
        
        # Smooth anti-aliased Gaussian edges
        mask_smooth = cv2.GaussianBlur(curr_mask, (15, 15), 0)
        mask_3d = np.stack([mask_smooth] * 3, axis=-1)
        
        bg_canvas = np.zeros((out_h, out_w, 3), dtype=np.uint8)
        bg_canvas[:] = bg_color
        
        composite = (frame_resized.astype(np.float32) * mask_3d + bg_canvas.astype(np.float32) * (1.0 - mask_3d)).astype(np.uint8)
        
        # Soft floor vignette at bottom so legs transition into page
        for y in range(int(out_h * 0.90), out_h):
            fade = 1.0 - (y - out_h * 0.90) / (out_h * 0.10)
            composite[y, :] = (composite[y, :].astype(np.float32) * fade + bg_color.astype(np.float32) * (1.0 - fade)).astype(np.uint8)
            
        out.write(composite)
        last_frame = composite
        frame_idx += 1
        
        if frame_idx % 24 == 0:
            print(f"Processed {frame_idx}/{total_frames} frames ({frame_idx/fps:.1f}s)")
            
    # Add 5.0 seconds (120 frames at 24fps) freeze on final completed frame
    if last_frame is not None:
        pause_frames = int(5.0 * fps)
        print(f"Adding {pause_frames} frames (5.0s pause) on final completed pose...")
        for _ in range(pause_frames):
            out.write(last_frame)
            
    cap.release()
    out.release()
    print(f"Successfully exported clean video to {output_video}")

if __name__ == "__main__":
    generate_clean_video()
