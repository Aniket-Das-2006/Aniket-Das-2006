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
    illustration_src = os.path.join(current_dir, "raw-images", "illustration.png")
    avatar_src = os.path.join(current_dir, "raw-images", "avatar.png")
    
    if not os.path.exists(illustration_src) or not os.path.exists(avatar_src):
        print("Error: Generated images not found at the expected paths.")
        sys.exit(1)
        
    print("Encoding images to base64...")
    illustration_base64 = get_base64_image(illustration_src)
    avatar_base64 = get_base64_image(avatar_src)
    
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
            "{AVATAR_BASE64}": f"data:image/png;base64,{avatar_base64}"
        })
        
    print("Build complete!")

if __name__ == "__main__":
    main()
