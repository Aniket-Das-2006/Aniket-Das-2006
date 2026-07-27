import base64
import os
import sys

def get_base64_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def build_svg(template_path, output_path, replacements):
    print(f"Loading template from {template_path}...")
    with open(template_path, "r", encoding="utf-8") as file:
        content = file.read()
    
    for placeholder, value in replacements.items():
        content = content.replace(placeholder, value)
        
    print(f"Writing final SVG to {output_path}...")
    with open(output_path, "w", encoding="utf-8") as file:
        file.write(content)

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Image source files
    illustration_src = os.path.join(current_dir, "illustration.png")
    avatar_src = os.path.join(current_dir, "avatar.png")
    
    # Sync custom profile badge if available
    downloads_badge = r"D:\Downloads\PROFILE BADGE.png"
    if os.path.exists(downloads_badge):
        import shutil
        print(f"Updating avatar.png from {downloads_badge}...")
        try:
            shutil.copy2(downloads_badge, avatar_src)
        except Exception as e:
            print(f"Warning: Could not copy custom badge: {e}")
            
    if not os.path.exists(illustration_src) or not os.path.exists(avatar_src):
        print("Error: Required raw images (illustration.png or avatar.png) not found in the workspace.")
        sys.exit(1)
        
    print("Encoding images to base64...")
    illustration_base64 = get_base64_image(illustration_src)
    avatar_base64 = get_base64_image(avatar_src)
    
    # Detect the image MIME type of the avatar to ensure correct rendering in SVGs
    with open(avatar_src, "rb") as f:
        header = f.read(4)
    avatar_mime = "image/png"
    if header.startswith(b"\xff\xd8"):
        avatar_mime = "image/jpeg"
    elif header.startswith(b"RIFF") and header[8:12] == b"WEBP":
        avatar_mime = "image/webp"
    print(f"Detected avatar MIME type: {avatar_mime}")
    
    # 1. Dark Banner
    dark_template = os.path.join(current_dir, "banner-dark.template.svg")
    dark_output = os.path.join(current_dir, "profile-banner-dark.svg")
    if os.path.exists(dark_template):
        build_svg(dark_template, dark_output, {
            "{ILLUSTRATION_BASE64}": f"data:image/png;base64,{illustration_base64}"
        })
        
    # 2. Light Banner
    light_template = os.path.join(current_dir, "banner-light.template.svg")
    light_output = os.path.join(current_dir, "profile-banner-light.svg")
    if os.path.exists(light_template):
        build_svg(light_template, light_output, {
            "{ILLUSTRATION_BASE64}": f"data:image/png;base64,{illustration_base64}"
        })
        
    # 3. Lanyard Badge
    lanyard_template = os.path.join(current_dir, "lanyard.template.svg")
    lanyard_output = os.path.join(current_dir, "profile-lanyard.svg")
    if os.path.exists(lanyard_template):
        build_svg(lanyard_template, lanyard_output, {
            "{AVATAR_BASE64}": f"data:{avatar_mime};base64,{avatar_base64}"
        })
        
    print("Build complete successfully!")

if __name__ == "__main__":
    main()
