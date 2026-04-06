import os

replacements = {
    "/assets/Videos/Frame 2 BG.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775460683/Bg_compressed_1_fectii.mp4",
    "/assets/Videos/Frame 10 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439054/Frame_10_video_compressed_1_tny2ri.mp4",
    "/assets/Videos/Frame 8 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439056/Frame_8_video_compressed_1_zetonb.mp4",
    "/assets/Videos/Frame 7 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439058/Frame_7_video_compressed_1_wrbz79.mp4",
    "/assets/Videos/Frame 11 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439060/FRame_11_compressed_1_yyi70w.mp4",
    "/assets/Videos/Frame 5 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439058/Frame_5_video_compressed_1_xsnsuq.mp4",
    "/assets/Videos/Frame 9 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439054/Frame_9_video_compressed_1_lkmnqa.mp4",
    "/assets/Videos/Frame 6 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439057/Frame_6_video_compressed_1_kugli4.mp4",
    "/assets/Videos/Frame 12 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439056/Frame_12_compressed_1_tnbw3e.mp4",
    "/assets/Videos/Frame 1 Video.mp4": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439056/Frame_1_Video_compressed_2_pydbke.mp4",
    "/assets/Audio/Audio files for IPhone/Frame 5.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439020/Frame_5_l7cv1v.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 6.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439019/Frame_6_utq6an.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 7.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439020/Frame_7_zvdpss.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 8.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439019/Frame_8_lc8ewe.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 9.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439020/Frame_9_gmjgs1.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 10.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439019/Frame_10_covwmo.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 11.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439020/Frame_11_vw6voj.m4a",
    "/assets/Audio/Audio files for IPhone/Frame 12.m4a": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439019/Frame_12_tbaxtr.m4a",
    "/assets/Audio/Music/This Background Music.wav": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439018/This_Background_Music_lokdsh.mp3",
    "/assets/Audio/SFX/correct-answer.mp3?v=1": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775460401/correct-answer_ersukl.mp3",
    "/assets/Audio/SFX/Wrong.wav?v=1": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439017/Wrong_whmvbg.mp3",
    "/assets/Audio/SFX/Time Over.wav?v=1": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439017/Time_Over_hqbmpd.mp3",
    "/assets/Audio/SFX/Timer.wav?v=1": "https://res.cloudinary.com/doaw2nfrp/video/upload/v1775439017/Timer_tn7dmt.mp3"
}

target_dir = r"c:\Users\artha\OneDrive\Desktop\Game\src"

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith((".js", ".jsx", ".css")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            for old_str, new_str in replacements.items():
                new_content = new_content.replace(old_str, new_str)
                # Handle URL-encoded spaces occasionally found in code
                url_encoded_old_str = old_str.replace(" ", "%20")
                if url_encoded_old_str != old_str:
                    new_content = new_content.replace(url_encoded_old_str, new_str)
                
            if new_content != content:
                print(f"Updated {filepath}")
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
