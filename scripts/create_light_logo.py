from PIL import Image
import os

dark_path = "public/images/navbar-logo-dark.png"
light_path = "public/images/navbar-logo-light.png"
icon_path = "public/images/icon-logo.png"

if not os.path.exists(dark_path):
    print("Error: dark logo not found at", dark_path)
    exit(1)

dark_img = Image.open(dark_path).convert("RGBA")
print(f"Loaded dark logo: size={dark_img.size}")

# Create light version
light_img = Image.new("RGBA", dark_img.size, (0, 0, 0, 0))

for y in range(dark_img.height):
    for x in range(dark_img.width):
        r, g, b, a = dark_img.getpixel((x, y))
        if a < 10:
            continue
        
        # Check if pixel is amber/orange vs white/silver
        # In dark logo: amber has r high, b low: r - b > 40 and r > 120
        if r - b > 40 and r > 120:
            # Amber part - deepen slightly for crisp contrast on light background
            scale = min(1.0, (r * 0.299 + g * 0.587 + b * 0.114) / 180.0)
            nr = int(217 * scale)
            ng = int(119 * scale)
            nb = int(6 * scale)
            light_img.putpixel((x, y), (nr, ng, nb, a))
        else:
            # White/silver part -> transform into rich obsidian dark (#090d16 / #0f172a)
            # Preserve anti-aliased edge alpha
            brightness = (r + g + b) / 3.0 / 255.0
            nr = int(9 + (1.0 - brightness) * 30)
            ng = int(13 + (1.0 - brightness) * 30)
            nb = int(22 + (1.0 - brightness) * 35)
            light_img.putpixel((x, y), (nr, ng, nb, a))

light_img.save(light_path)
print(f"Successfully saved {light_path} (exists={os.path.exists(light_path)}, size={os.path.getsize(light_path)} bytes)")

# Also create icon-logo.png from monogram if needed
monogram_crop = dark_img.crop((20, 20, 500, 270))
mono_bbox = monogram_crop.getbbox()
if mono_bbox:
    mono = monogram_crop.crop(mono_bbox)
    sq_size = 512
    sq_dark = Image.new('RGBA', (sq_size, sq_size), (0, 0, 0, 0))
    scale_factor = min(400.0 / mono.width, 400.0 / mono.height)
    new_w = int(mono.width * scale_factor)
    new_h = int(mono.height * scale_factor)
    mono_resized = mono.resize((new_w, new_h), Image.Resampling.LANCZOS)
    sq_dark.paste(mono_resized, ((sq_size - new_w) // 2, (sq_size - new_h) // 2), mono_resized)
    sq_dark.save(icon_path)
    sq_dark.save("public/favicon.png")
    sq_dark.save("app/icon.png")
    print("Successfully saved icon-logo.png, favicon.png, and app/icon.png!")
