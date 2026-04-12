"use client"

import { useState } from "react"

export function ContactSection() {
  const [submitHovered, setSubmitHovered] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    project: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        subject: `New Contact Inquiry from ${formData.name}`,
        from_name: "Numara Group Website",
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Thank you for reaching out. Our concierge team will contact you shortly.")
      setFormData({ name: "", email: "", contact: "", project: "", message: "" })
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <section
      id="contact-section"
      style={{
        backgroundColor: "#F8F0E5",
        padding: "clamp(40px, 5vw, 80px) clamp(20px, 5vw, 80px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div 
        style={{ 
          maxWidth: "1400px", 
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "clamp(32px, 6vw, 64px)",
          alignItems: "center",
        }}
      >
        
        {/* ==========================================
            LEFT COLUMN: Copy 
            ========================================== */}
        <div style={{ flex: "1 1 min(100%, 400px)", display: "flex", flexDirection: "column" }}>
          
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(50px, 5.1vw, 96px)", 
            fontWeight: 600, 
            lineHeight: 1.1,
            color: "#412c17",
            marginBottom: "16px",
            letterSpacing: "-0.02em"
          }}>
            You Have Questions,<br />We Have Answers
          </h2>
          
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "clamp(18px, 2vw, 22px)", 
            color: "#776251",
            lineHeight: 1.6,
            maxWidth: "520px",
            margin: 0, 
          }}>
            Discover living experiences you won't find anywhere else — thoughtfully designed to immerse you in the heart of luxury. Soulful stories waiting to be lived.
          </p>

        </div>

        {/* ==========================================
            RIGHT COLUMN: The Form Card
            ========================================== */}
        <div style={{ flex: "1 1 min(100%, 550px)" }}> 
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#ffffff", 
              padding: "clamp(24px, 4vw, 40px)", 
              borderRadius: "16px", 
              boxShadow: "0 20px 40px rgba(65, 44, 23, 0.05)",
            }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 4vw, 48px)", 
              fontWeight: 600, 
              color: "#412c17",
              marginBottom: "10px"
            }}>
              Tell Us What You Need
            </h3>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(18px, 1.8vw, 22px)", 
              color: "#776251",
              marginBottom: "30px",
              fontWeight: 500,
            }}>
              Our team is ready to assist you with every detail, big or small.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              
              {/* Row 1: Name & Contact */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "18px" }}>
                <InputField label="Name *" name="name" value={formData.name} onChange={handleChange} required />
                <InputField label="Contact Number *" name="contact" type="tel" value={formData.contact} onChange={handleChange} required />
              </div>

              {/* Row 2: Email & Project */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "18px" }}>
                <InputField label="Email ID *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Project Interested In" name="project" value={formData.project} onChange={handleChange} />
              </div>

              {/* Message Textarea */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="message" style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "#776251", fontWeight: 500 }}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(65, 44, 23, 0.2)",
                    background: "transparent",
                    color: "#412c17",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "18px", 
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#c2a170"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(65, 44, 23, 0.2)"}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "20px 16px",
                  borderRadius: "50px",
                  border: `1px solid ${submitHovered ? "#a3865a" : "#c2a170"}`,
                  backgroundColor: submitHovered ? "#a3865a" : "transparent",
                  color: submitHovered ? "#ffffff" : "#c2a170",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 800, 
                  fontSize: "18px", 
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Submit
              </button>

            </div>
          </form>
        </div>
        
      </div>
    </section>
  )
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

function InputField({ label, name, ...props }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      <label 
        htmlFor={name}
        style={{ 
          fontFamily: "'Lato', sans-serif", 
          fontSize: "16px", 
          color: isFocused ? "#c2a170" : "#776251",
          fontWeight: 500,
          transition: "color 0.3s ease"
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "8px", 
          border: `1px solid ${isFocused ? "#c2a170" : "rgba(65, 44, 23, 0.2)"}`,
          background: "transparent",
          color: "#412c17",
          fontFamily: "'Lato', sans-serif",
          fontSize: "18px", 
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        {...props}
      />
    </div>
  )
}