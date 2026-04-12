export function SectionDivider() {
  return (
    <div style={{
      width: '100%',
      height: '48px',
      background: '#F8F0E5',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '1.5px',
        background: '#C2A170',
        opacity: 0.9,
        transform: 'translateY(-50%)',
      }} />
    </div>
  );
}