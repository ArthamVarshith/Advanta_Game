import os

replacements = {
    "/assets/images/Farmer pointing.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775439055/Farmer_pointing_sz8tpb_1_td11ku.png",
    "/assets/images/Frame 10 end.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460333/Frame_10_end_efufdl.png",
    "/assets/images/frame.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459776/frame_ualhd5.png",
    "/assets/images/Volume Button.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459773/Volume_Button_ytkrww.png",
    "/assets/images/Frame 8 end.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775439049/Frame_8_end_a0vnf9_1_sbdgoe.png",
    "/assets/images/Frame 9 end.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775439048/Frame_9_end_lxlgct_1_zdbqug.png",
    "/assets/images/Timer BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459376/Timer_BG_ovvv2q.png",
    "/assets/images/Settings BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459376/Settings_BG_ro3usk.png",
    "/assets/images/Name and number pannel.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459774/Name_and_number_pannel_w4wx6m.png",
    "/assets/images/Happiness Meter BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459376/Happiness_Meter_BG_kahnnm.png",
    "/assets/images/Frame 6 end.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775439047/Frame_6_end_litact_1_seyary.png",
    "/assets/images/Frame 7 end.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775439045/Frame_7_end_kbmw1m_1_gl1uxz.png",
    "/assets/images/Frame 5 end.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775439045/Frame_5_end_orxgvl_1_ihpemp.png",
    "/assets/images/BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459769/BG_hexnsc.png",
    "/assets/images/Button 1.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459770/Button_1_dzr6ar.png",
    "/assets/images/Correct answer BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459376/Correct_answer_BG_emioqd.png",
    "/assets/images/Button 2.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459770/Button_2_w3nauu.png",
    "/assets/images/Buttons for letters.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459770/Buttons_for_letters_xconf2.png",
    "/assets/images/Button BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459526/Button_BG_rohd7d.png",
    "/assets/images/Arrow.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460148/Arrow_xyd32j.png",
    "/assets/images/Wrong Answer Button PNG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460184/Wrong_Answer_Button_PNG_nfipup.png",
    "/assets/images/Wrong Answer BG.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460213/Wrong_Answer_BG_bydgtu.png",
    "/assets/images/Glow-Photoroom.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460241/Glow-Photoroom_ynths4.png",
    "/assets/images/Jumbo Super logo.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460288/Jumbo_Super_logo_wdwo1s.png",
    "/assets/images/Safalta_ractangualr.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775460362/Safalta_ractangualr_vdsq9i.png",
    "/assets/images/house.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459526/house_auasvz.png",
    "/assets/images/Pause Button.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459527/Pause_Button_zmtlnr.png",
    "/assets/images/Play Button.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459527/Play_Button_blqa04.png",
    "/assets/images/Sound Button.png": "https://res.cloudinary.com/doaw2nfrp/image/upload/v1775459527/Sound_Button_rarwwt.png"
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
                
            if new_content != content:
                print(f"Updated {filepath}")
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
