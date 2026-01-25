import BackgroundDecor from './BackgroundDecor';

export default function PageWrapper({ children }) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <BackgroundDecor />
      {children}
    </div>
  );
}

