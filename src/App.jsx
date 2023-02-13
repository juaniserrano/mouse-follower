import { useEffect, useState } from 'react';

export default function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('useEffect', { enabled });

    const handlMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener('pointermove', handlMove);
    }

    //clean useEffect
    return () => {
      window.removeEventListener('pointermove', handlMove);
    };
  }, [enabled]);

  return (
    <main>
      <div
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          width: 30,
          height: 30,
          backgroundColor: 'black',
          borderRadius: '50%',
          border: '1px solid #ccc',
          transform: `translate(${position.x}px, ${position.y}px})`,
          display: enabled ? 'block' : 'none',
          // inser delay to show the cursor
          transition: 'all 0.05s ease',
        }}
      />
      <h2>Mouse Follower</h2>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} Seguir mi puntero
      </button>
    </main>
  );
}
