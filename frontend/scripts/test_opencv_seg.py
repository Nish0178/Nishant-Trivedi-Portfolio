import cv2
import numpy as np

def test_opencv_seg():
    im = cv2.imread('public/images/frame_72.jpg')
    h, w = im.shape[:2]
    
    # Target size
    out_w, out_h = 720, 1280
    im_resized = cv2.resize(im, (out_w, out_h), interpolation=cv2.INTER_AREA)
    
    # 1. Convert to HSV and LAB for accurate skin/suit/chair extraction vs grey/white wall
    hsv = cv2.cvtColor(im_resized, cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(im_resized, cv2.COLOR_BGR2LAB)
    gray = cv2.cvtColor(im_resized, cv2.COLOR_BGR2GRAY)
    
    # Wall in studio is high brightness (L > 160 or V > 180) and very low saturation (S < 35)
    # Pillars on sides are black (V < 20)
    # The person + chair has texture, saturation, or specific luminance
    
    # Mask of the background wall:
    is_wall = (hsv[:, :, 2] > 160) & (hsv[:, :, 1] < 45) & (np.abs(lab[:, :, 1].astype(np.int32) - 128) < 15) & (np.abs(lab[:, :, 2].astype(np.int32) - 128) < 15)
    
    # Outer pillars
    is_black_pillar = (gray < 25)
    
    # Foreground mask: neither wall nor black pillar
    fg_mask = (~is_wall) & (~is_black_pillar)
    fg_mask = fg_mask.astype(np.uint8) * 255
    
    # Morphological refinement to fill holes in suit/shirt and remove speckles
    kernel_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11))
    kernel_open = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    
    fg_clean = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel_close)
    fg_clean = cv2.morphologyEx(fg_clean, cv2.MORPH_OPEN, kernel_open)
    
    # Soft feathering
    mask_smooth = cv2.GaussianBlur(fg_clean, (13, 13), 0) / 255.0
    mask_3d = np.stack([mask_smooth] * 3, axis=-1)
    
    bg_color = np.array([7, 7, 7], dtype=np.uint8) # #070707
    bg_canvas = np.zeros((out_h, out_w, 3), dtype=np.uint8)
    bg_canvas[:] = bg_color
    
    composite = (im_resized.astype(np.float32) * mask_3d + bg_canvas.astype(np.float32) * (1.0 - mask_3d)).astype(np.uint8)
    cv2.imwrite('public/images/test_opencv_composite.jpg', composite)
    print('OpenCV composite test written!')

if __name__ == '__main__':
    test_opencv_seg()
