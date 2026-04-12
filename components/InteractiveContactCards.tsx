'use client';

import { useState, useEffect, useRef } from 'react';

export default function InteractiveContactCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    // Triggers ONLY when the card is in the middle 30% of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleCards((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(entry.target.id);
            } else {
              newSet.delete(entry.target.id);
            }
            return newSet;
          });
        });
      },
      { 
        rootMargin: "-35% 0px -35% 0px", 
        threshold: 0 
      }
    );

    Object.values(cardsRef.current).forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const contactCards = [
    {
      id: 'location',
      title: 'Our Location',
      subtitle: 'Visit Us',
      details: '1st Floor, Anzar Elegance, Madhavrao Gangan St.',
      subdetails: 'Agripada, Mumbai-400011',
      icon: 'location',
    },
    {
      id: 'email',
      title: 'Reach Out',
      subtitle: 'Send Email',
      details: 'contact@numaragroup.com',
      subdetails: 'Response within 24 hours',
      icon: 'email',
    },
    {
      id: 'phone',
      title: 'Call Us',
      subtitle: 'Phone Support',
      details: '+91 7900084786',
      subdetails: 'Monday - Saturday, 9AM - 9PM IST',
      icon: 'phone',
    },
  ];

  // Restored: Clean, minimalist line-art SVGs
  const LocationIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '60px', height: '60px' }}>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="none"
        stroke="#c2a170"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '60px', height: '60px' }}>
      <path
        d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
        fill="none"
        stroke="#c2a170"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="#c2a170"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: '60px', height: '60px' }}>
      <path
        d="M5.5 4H7.5C8 4 8.5 4.5 8.5 5V7.5C8.5 8 8 8.5 7.5 8.5H6.5C7.5 12 10.5 15 14 16V15C14 14.5 14.5 14 15 14H17.5C18 14 18.5 14.5 18.5 15V17C18.5 17.5 18 18 17.5 18C10.5 18 5.5 13 5.5 6V4.5C5.5 4.2 5.2 4 5.5 4Z"
        fill="none"
        stroke="#c2a170"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section
      style={{
        padding: 'clamp(40px, 10vw, 60px) clamp(20px, 5vw, 80px)',
        backgroundColor: '#F8F0E5',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(40px, 5vw, 80px)',
              fontWeight: 500,
              lineHeight: 1.1,
              color: '#412c17',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: '#776251',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Choose your preferred way to connect with our team.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(24px, 4vw, 40px)',
            marginBottom: '48px',
          }}
        >
          {contactCards.map((card) => {
            const isActive = isMobile ? visibleCards.has(card.id) : hoveredCard === card.id;

            return (
              <div
                key={card.id}
                id={card.id}
                ref={(el) => {
                  if (el) cardsRef.current[card.id] = el;
                }}
                onMouseEnter={() => !isMobile && setHoveredCard(card.id)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                style={{
                  backgroundColor: '#ffffff',
                  padding: 'clamp(32px, 4vw, 48px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(194, 161, 112, 0.2)',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: isActive ? 'translateY(-12px)' : 'translateY(0)',
                  boxShadow: isActive
                    ? '0 24px 48px rgba(65, 44, 23, 0.08)'
                    : '0 10px 30px rgba(65, 44, 23, 0.03)',
                  borderColor: isActive ? '#c2a170' : 'rgba(194, 161, 112, 0.2)',
                }}
              >
                <div
                  style={{
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {card.icon === 'location' && <LocationIcon />}
                  {card.icon === 'email' && <EmailIcon />}
                  {card.icon === 'phone' && <PhoneIcon />}
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(24px, 2.5vw, 32px)',
                    fontWeight: 400,
                    marginBottom: '8px',
                    color: isActive ? '#c2a170' : '#412c17',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 'clamp(13px, 1.2vw, 15px)',
                    color: isActive ? '#c2a170' : '#776251',
                    marginBottom: '24px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {card.subtitle}
                </p>

                <div
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    width: '100%',
                    transition: 'background-color 0.4s ease',
                    backgroundColor: isActive
                      ? 'rgba(194, 161, 112, 0.1)'
                      : 'rgba(194, 161, 112, 0.05)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 'clamp(15px, 1.5vw, 18px)',
                      color: isActive ? '#412c17' : '#412c17',
                      fontWeight: 600,
                      marginBottom: '8px',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {card.details}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      color: isActive ? '#776251' : '#776251',
                      lineHeight: '1.5',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {card.subdetails}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        
        
      </div>
    </section>
  );
}