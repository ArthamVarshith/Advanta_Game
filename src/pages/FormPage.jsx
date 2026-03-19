import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './FormPage.css';

const FormPage = ({ onSubmit }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [stateName, setStateName] = useState('');

  const handleSubmit = () => {
    const isValidName = name.trim().length >= 3;
    const phoneRegex = /^[0-9]{10}$/;
    if (!name.trim() || !isValidName) { alert(t.nameError || 'Please enter a valid name.'); return; }
    if (!phone.trim() || !phoneRegex.test(phone.trim())) { alert(t.phoneError || 'Please enter a valid 10 digit number.'); return; }
    if (!district.trim()) { alert('Please enter your district.'); return; }
    if (!stateName.trim()) { alert('Please enter your state.'); return; }
    onSubmit({ name: name.trim(), phone: phone.trim(), district: district.trim(), state: stateName.trim() });
  };

  return (
    <div className="page active form-page-container">
      <video className="fluid-bg" src="/assets/Videos/Frame 2 BG.mp4" autoPlay loop muted playsInline />

      <div className="form-content-wrapper">

        <img src="/assets/images/Farmer pointing.png" alt="farmer" className="farmer-img-form" />

        {/* Frame below — grows to fit all content inside */}
        <div className="form-frame-wrapper">
          <img src="/assets/images/frame.png" alt="" className="form-frame-bg" />

          {/* form-board-content is full width — it DRIVES the frame height */}
          <div className="form-board-content">

            <h2 className="form-title">{t.formPageTitle}</h2>

            <div className="form-fields-container">
              <div className="form-input-group">
                <label className="form-label">{t.namePlaceholder}</label>
                <div className="input-bg-container">
                  <img src="/assets/images/Name and number pannel.png" alt="" className="input-bg" />
                  <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>

              <div className="form-input-group">
                <label className="form-label">{t.phonePlaceholder}</label>
                <div className="input-bg-container">
                  <img src="/assets/images/Name and number pannel.png" alt="" className="input-bg" />
                  <input type="tel" maxLength={10} className="form-input" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="form-input-group">
                <label className="form-label">{t.districtLabel}</label>
                <div className="input-bg-container">
                  <img src="/assets/images/Name and number pannel.png" alt="" className="input-bg" />
                  <input type="text" className="form-input" value={district} onChange={e => setDistrict(e.target.value)} />
                </div>
              </div>

              <div className="form-input-group">
                <label className="form-label">{t.stateLabel}</label>
                <div className="input-bg-container">
                  <img src="/assets/images/Name and number pannel.png" alt="" className="input-bg" />
                  <input type="text" className="form-input" value={stateName} onChange={e => setStateName(e.target.value)} />
                </div>
              </div>
            </div>

            <button className="submit-action-btn" onClick={handleSubmit}>
              <img src="/assets/images/Button 2.png" alt="" className="btn-bg" />
              <span className="btn-text">{t.submitBtn}</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;