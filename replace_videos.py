import os

replacements = {
    "/assets/Videos/Frame 2 BG.mp4": "https://res.cloudinary.com/dbyrmzuuw/video/upload/v1774077859/Frame_2_BG_qhrhma.mp4",
    "/assets/Videos/Frame 10 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774604523/Frame_10_sajhi9.mp4",
    "/assets/Videos/Frame 8 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774603454/Frame_8_smjeuf.mp4",
    "/assets/Videos/Frame 7 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774603453/Frame_7_cymima.mp4",
    "/assets/Videos/Frame 11 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774604522/Frame_11_rf9cwr.mp4",
    "/assets/Videos/Frame 5 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774603455/Frame_5_zg86lm.mp4",
    "/assets/Videos/Frame 9 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774603458/Frame_9_virfdk.mp4",
    "/assets/Videos/Frame 6 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774603445/Frame_6_ykt4pt.mp4",
    "/assets/Videos/Frame 12 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774604511/Frame_12_uley5c.mp4",
    "/assets/Videos/Frame 1 Video.mp4": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1774604516/Frame_1_lwaq7r.mp4",
    "/assets/Audio/Audio files for IPhone/Frame 5.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143012/Frame_5_pqfhif.wav",
    "/assets/Audio/Audio files for IPhone/Frame 6.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143012/Frame_6_urtzcl.wav",
    "/assets/Audio/Audio files for IPhone/Frame 7.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143014/Frame_7_sbaiw7.wav",
    "/assets/Audio/Audio files for IPhone/Frame 8.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143014/Frame_8_e00ued.wav",
    "/assets/Audio/Audio files for IPhone/Frame 9.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143012/Frame_9_ei0nsc.wav",
    "/assets/Audio/Audio files for IPhone/Frame 10.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143012/Frame_10_m0uvv1.wav",
    "/assets/Audio/Audio files for IPhone/Frame 11.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143012/Frame_11_ehi8hc.wav",
    "/assets/Audio/Audio files for IPhone/Frame 12.m4a": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143013/Frame_12_pmu4kb.wav",
    "/assets/Audio/Music/This Background Music.wav": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143463/This_Background_Music_lz03gq.wav",
    "/assets/Audio/SFX/correct-answer.mp3?v=1": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143488/correct-answer_ccbjlu.mp3",
    "/assets/Audio/SFX/Wrong.wav?v=1": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143489/Wrong_zjpixn.wav",
    "/assets/Audio/SFX/Time Over.wav?v=1": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143490/Time_Over_ru0xad.wav",
    "/assets/Audio/SFX/Timer.wav?v=1": "https://res.cloudinary.com/dfkraqvyy/video/upload/v1775143491/Timer_vjrkaw.wav"
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
