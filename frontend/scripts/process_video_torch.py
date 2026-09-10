import torch
import torchvision.transforms as T
from torchvision.models.segmentation import lraspp_mobilenet_v3_large, LRASPP_MobileNet_V3_Large_Weights, deeplabv3_mobilenet_v3_large, DeepLabV3_MobileNet_V3_Large_Weights
import cv2
import numpy as np
import os

def process_video():
    input_video = "public/video/hero-walking.mp4"
    output_video = "public/video/hero-walking-clean.mp4"
    
    cap = cv2.VideoCapture(input_video)
    fps = cap.get(cv2.CAP_PROP_FPS) or 24.0
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"Reading {input_video}: {w}x{h} @ {fps}fps, total {total_frames} frames")
    
    # Load PyTorch DeepLabV3 MobileNetV3 (high precision VOC model)
    try:
        model = deeplabv3_mobilenet_v3_large(weights=DeepLabV3_MobileNet_V3_Large_Weights.DEFAULT).eval()
    except Exception:
        model = lraspp_mobilenet_v3_large(weights=LRASPP_MobileNet_V3_Large_Weights.DEFAULT).eval()
        
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    
    transform = T.Compose([
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    out_w, out_h = 720, 1280
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video, fourcc, fps, (out_w, out_h))
    
    bg_color = np.array([7, 7, 7], dtype=np.uint8) # #070707
    
    frame_idx = 0
    last_frame = None
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        frame_resized = cv2.resize(frame, (out_w, out_h), interpolation=cv2.INTER_AREA)
        rgb = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2RGB)
        
        # Inference for segmentation
        input_tensor = transform(rgb).unsqueeze(0).to(device)
        with torch.no_grad():
            output = model(input_tensor)['out'][0]
            # Softmax or argmax
            pred = output.argmax(0).byte().cpu().numpy()
            
        # Class 15: person, Class 9: chair
        mask = ((pred == 15) | (pred == 9)).astype(np.float32)
        
        # Soft dilate and blur for natural anti-aliased hair & suit edge blending
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
        mask_dilated = cv2.dilate(mask, kernel, iterations=1)
        mask_blurred = cv2.GaussianBlur(mask_dilated, (15, 15), 0)
        mask_3d = np.stack([mask_blurred] * 3, axis=-1)
        
        # Create background
        bg_canvas = np.zeros((out_h, out_w, 3), dtype=np.uint8)
        bg_canvas[:] = bg_color
        
        # Composite person + chair on clean #070707 background
        composite = (frame_resized.astype(np.float32) * mask_3d + bg_canvas.astype(np.float32) * (1.0 - mask_3d)).astype(np.uint8)
        
        # Feather bottom edge slightly so feet transition gracefully onto page floor
        for y in range(int(out_h * 0.92), out_h):
            fade = 1.0 - (y - out_h * 0.92) / (out_h * 0.08)
            composite[y, :] = (composite[y, :].astype(np.float32) * fade + bg_color.astype(np.float32) * (1.0 - fade)).astype(np.uint8)
            
        out.write(composite)
        last_frame = composite
        frame_idx += 1
        
        if frame_idx % 24 == 0:
            print(f"Processed {frame_idx}/{total_frames} frames ({frame_idx/fps:.1f}s)")
            
    # Add 5 seconds pause on final frame as requested
    if last_frame is not None:
        pause_frames = int(5.0 * fps)
        print(f"Writing {pause_frames} frames (5.0s pause) of final pose...")
        for _ in range(pause_frames):
            out.write(last_frame)
            
    cap.release()
    out.release()
    print(f"Generated {output_video} successfully!")

if __name__ == "__main__":
    process_video()
