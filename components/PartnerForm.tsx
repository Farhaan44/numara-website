"use client"

import { useState } from "react"

export function PartnerForm() {
  const [formData, setFormData] = useState({
    firmName: "",
    name: "",
    locality: "",
    address: "",
    zone: "",
    mobile: "",
    pan: "",
    rera: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Web3Forms Logic
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formData,
        access_key: process.env.NEXT_PUBLIC_W3F_KEY,
        subject: `New Partner Registration: ${formData.firmName}`,
        from_name: "Numara Group - Partner Portal",
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Thank you for your interest. Our team will contact you shortly.")
      setFormData({
        firmName: "",
        name: "",
        locality: "",
        address: "",
        zone: "",
        mobile: "",
        pan: "",
        rera: "",
        email: "",
      })
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

        .pf-section {
          background-color: #F8F0E5;
          padding: clamp(48px, 8vw, 120px) clamp(20px, 5vw, 80px) clamp(32px, 5vw, 64px);
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }

        .pf-inner {
          max-width: 1200px;
          width: 100%;
        }

        /* ── Header ── */
        .pf-header {
          margin-bottom: clamp(28px, 4vw, 48px);
        }

        .pf-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 500;
          color: #412c17;
          line-height: 1.15;
          margin: 0 0 12px 0;
          max-width: 820px;
        }

        .pf-subtitle {
          font-family: 'Lato', sans-serif;
          font-size: clamp(11px, 1.1vw, 13px);
          font-weight: 400;
          color: #776251;
          letter-spacing: 0.04em;
          margin: 0;
        }

        /* ── Card — fits remaining viewport height ── */
        .pf-card {
          background: #ffffff;
          padding: clamp(20px, 2.5vw, 36px) clamp(24px, 3vw, 48px);
          border-radius: 4px;
          box-shadow: 0 20px 60px rgba(65, 44, 23, 0.07);
          border: 1px solid rgba(194, 161, 112, 0.22);
          box-sizing: border-box;
        }

        /* ── Grid ── */
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(14px, 1.8vw, 24px) clamp(32px, 5vw, 80px);
          margin-bottom: clamp(16px, 2vw, 28px);
        }

        /* ── Column ── */
        .pf-col {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.6vw, 20px);
        }

        /* ── Field ── */
        .pf-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pf-label {
          font-family: 'Lato', sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 800;
          color: #776251;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }

        .pf-label.focused { color: #c2a170; }

        .pf-input {
          width: 100%;
          padding: clamp(5px, 0.6vw, 8px) 0;
          border: none;
          border-bottom: 1px solid rgba(65, 44, 23, 0.18);
          background: transparent;
          color: #412c17;
          font-family: 'Lato', sans-serif;
          font-size: clamp(13px, 1.2vw, 16px);
          font-weight: 400;
          outline: none;
          transition: border-color 0.25s ease;
          box-sizing: border-box;
        }

        .pf-input:focus { border-bottom-color: #c2a170; }
        .pf-input::placeholder { color: rgba(65, 44, 23, 0.25); }

        /* ── Select ── */
        .pf-select-wrap { position: relative; }

        .pf-select {
          width: 100%;
          padding: clamp(5px, 0.6vw, 8px) 24px clamp(5px, 0.6vw, 8px) 0;
          border: none;
          border-bottom: 1px solid rgba(65, 44, 23, 0.18);
          background: transparent;
          color: #412c17;
          font-family: 'Lato', sans-serif;
          font-size: clamp(13px, 1.2vw, 16px);
          font-weight: 400;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          transition: border-color 0.25s ease;
          box-sizing: border-box;
        }

        .pf-select.empty { color: rgba(65, 44, 23, 0.5); }
        .pf-select:focus { border-bottom-color: #c2a170; }

        .pf-select-arrow {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        /* ── Radio ── */
        .pf-radio-row {
          display: flex;
          align-items: center;
          gap: clamp(12px, 2vw, 28px);
          padding: clamp(5px, 0.6vw, 8px) 0;
          border-bottom: 1px solid rgba(65, 44, 23, 0.18);
          flex-wrap: wrap;
        }

        .pf-radio-label-text {
          font-family: 'Lato', sans-serif;
          font-size: clamp(10px, 0.9vw, 12px);
          font-weight: 700;
          color: #000000;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .pf-radio-options {
          display: flex;
          gap: clamp(16px, 2vw, 28px);
        }

        .pf-radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-size: clamp(13px, 1.2vw, 16px);
          font-weight: 400;
          color: #412c17;
        }

        .pf-radio-option input[type="radio"] {
          accent-color: #c2a170;
          width: 15px;
          height: 15px;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* ── Submit ── */
        .pf-submit-wrap {
          padding-top: clamp(14px, 1.8vw, 24px);
          border-top: 1px solid rgba(194, 161, 112, 0.2);
        }

        .pf-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background-color: #c2a170;
          color: #ffffff;
          padding: clamp(10px, 1.1vw, 14px) clamp(24px, 3vw, 40px);
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .pf-submit-btn:hover {
          background-color: #a3865a;
          transform: translateY(-2px);
        }

        .pf-submit-arrow { transition: transform 0.3s ease; }
        .pf-submit-btn:hover .pf-submit-arrow { transform: translateX(5px); }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .pf-grid {
            grid-template-columns: 1fr;
            gap: clamp(12px, 4vw, 20px);
          }
          .pf-col:first-child {
            padding-bottom: clamp(16px, 4vw, 24px);
            margin-bottom: clamp(4px, 2vw, 8px);
            border-bottom: 1px solid rgba(194, 161, 112, 0.2);
          }
        }
      `}</style>

      <section className="pf-section">
        <div className="pf-inner">

          {/* Header — big, outside card */}
          <div className="pf-header">
            <h2 className="pf-title">
              Build New Milestones<br />
              Together With Us.
            </h2>
            <p className="pf-subtitle">Asterisk (*) marked are the mandatory fields</p>
          </div>

          {/* Card — compact, fits in remaining viewport */}
          <form className="pf-card" onSubmit={handleSubmit}>
            <div className="pf-grid">

              {/* Left Column */}
              <div className="pf-col">
                <InputField label="CP Firm Name *" name="firmName" value={formData.firmName} onChange={handleChange} required />
                <InputField label="Your Name *" name="name" value={formData.name} onChange={handleChange} required />
                <InputField label="Locality *" name="locality" value={formData.locality} onChange={handleChange} required />
                <InputField label="Address *" name="address" value={formData.address} onChange={handleChange} required />

                <div className="pf-field">
                  <label className="pf-label">Select Zone *</label>
                  <div className="pf-select-wrap">
                    <select
                      name="zone"
                      value={formData.zone}
                      onChange={handleChange}
                      required
                      className={`pf-select${formData.zone ? "" : " empty"}`}
                    >
                      <option value="" disabled>Choose a zone</option>
                      <option value="south">Mumbai South</option>
                      <option value="suburb">Mumbai Suburban</option>
                      <option value="navi">Navi Mumbai</option>
                      <option value="thane">Thane</option>
                      <option value="others">Others</option>
                    </select>
                    <svg className="pf-select-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5.5L9 1" stroke="#c2a170" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="pf-col">
                <InputField label="Mobile No *" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required />
                <InputField label="PAN Number" name="pan" value={formData.pan} onChange={handleChange} />

                <div className="pf-field">
                  <div className="pf-radio-row">
                    <span className="pf-radio-label-text">Rera Registered *</span>
                    <div className="pf-radio-options">
                      <label className="pf-radio-option">
                        <input type="radio" name="rera" value="yes" onChange={handleChange} required />
                        Yes
                      </label>
                      <label className="pf-radio-option">
                        <input type="radio" name="rera" value="no" onChange={handleChange} />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <InputField label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="pf-submit-wrap">
              <button type="submit" className="pf-submit-btn">
                Submit
                <svg
                  className="pf-submit-arrow"
                  width="14" height="10" viewBox="0 0 14 10"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="1" y1="5" x2="13" y2="5" />
                  <polyline points="9 1 13 5 9 9" />
                </svg>
              </button>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

function InputField({ label, name, ...props }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="pf-field">
      <label
        htmlFor={name}
        className={`pf-label${isFocused ? " focused" : ""}`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="pf-input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  )
}