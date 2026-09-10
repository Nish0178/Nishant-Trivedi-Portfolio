import cv2
import numpy as np
import mediapipe as mp
import os

def process_video():
    input_path = "public/video/hero-walking.mp4"
    output_clean_mp4 = "public/video/hero-walking-nobg.mp4"
    
    cap = cv2.VideoCapture(input_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"Processing video: {w}x{h} @ {fps}fps, {total_frames} frames")
    
    # Target size: 720x1280 or maintain aspect ratio for crisp sharp display
    out_w, out_h = 720, 1280
    
    # Use MediaPipe Selfie Segmentation
    mp_selfie_segmentation = mp.solutions.selfie_segmentation
    
    # Color of portfolio background: #070707 -> BGR (7, 7, 7)
    bg_color = np.array([7, 7, 7], dtype=np.uint8)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_clean_mp4, fourcc, fps, (out_w, out_h))
    
    frames_processed = []
    
    with mp_selfie_segmentation.SelfieSegmentation(model_selection=1) as selfie_segmentation:
        frame_idx = 0
        last_frame = None
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            frame = cv2.resize(frame, (out_w, out_h), interpolation=cv2.INTER_AREA)
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # MediaPipe segmentation mask (0.0 to 1.0)
            results = selfie_segmentation.process(rgb_frame)
            mask = results.segmentation_mask
            
            # Apply threshold & feathering for ultra-smooth edge anti-aliasing
            # Values > 0.45 are considered person/chair
            mask_smooth = cv2.GaussianBlur(mask, (15, 15), 0)
            mask_3d = np.stack([mask_smooth] * 3, axis=-1)
            
            # Create background canvas (#070707)
            bg_canvas = np.zeros((out_h, out_w, 3), dtype=np.uint8)
            bg_canvas[:] = bg_color
            
            # Alpha composite: frame * mask + bg * (1 - mask)
            composite = (frame.astype(np.float32) * mask_3d + bg_canvas.astype(np.float32) * (1.0 - mask_3d)).astype(np.uint8)
            
            # Vignette bottom & edges subtly to merge into the dark section
            vignette = np.ones((out_h, out_w, 1), dtype=np.float32)
            for y in range(out_h):
                if y > out_h * 0.88:
                    fade = 1.0 - (y - out_h * 0.88) / (out_h * 0.12)
                    vignette[y, :] *= fade
                if y < out_h * 0.05:
                    fade = y / (out_h * 0.05)
                    vignette[y, :] *= fade
            
            composite = (composite.astype(np.float32) * vignette + bg_canvas.astype(np.float32) * (1.0 - vignette)).astype(np.uint8)
            
            out.write(composite)
            last_frame = composite
            frame_idx += 1
            if frame_idx % 24 == 0:
                print(f"Processed {frame_idx}/{total_frames} frames ({frame_idx/fps:.1f}s)")

        # Also write 5 seconds pause (5 * 24 = 120 frames) of the last completed frame
        if last_frame is not None:
            pause_frames = int(5.0 * fps)
            print(f"Adding {pause_frames} frames (5.0s) pause on final frame...")
            for _ in range(pause_frames):
                out.write(last_frame)
                
    cap.release()
    out.release()
    print(f"Successfully generated {output_clean_mp4} with background removed and 5s freeze ending!")

if __name__ == "__main__":
    process_video()
