import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  src,
  className = '',
  radius = 50,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const colorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const el = colorRef.current;
    if (!el) return;

    // Start with spotlight off-screen
    el.style.setProperty('--x', '-100px');
    el.style.setProperty('--y', '-100px');
  }, []);

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        colorRef.current?.style.setProperty('--x', `${pos.current.x}px`);
        colorRef.current?.style.setProperty('--y', `${pos.current.y}px`);
      },
      overwrite: true
    });

    if (!isHovering) {
      setIsHovering(true);
    }
  };

  const handleLeave = () => {
    setIsHovering(false);
    gsap.to(pos.current, {
      duration: fadeOut,
      onComplete: () => {
        colorRef.current?.style.setProperty('--x', '-100px');
        colorRef.current?.style.setProperty('--y', '-100px');
      }
    });
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-container ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Grayscale base image */}
      <img
        src={src}
        alt="Profile"
        className="chroma-img-gray"
        loading="lazy"
      />

      {/* Color image with spotlight mask */}
      <div
        ref={colorRef}
        className="chroma-img-color"
        style={{
          '--r': `${radius}px`,
          '--x': '-100px',
          '--y': '-100px',
          backgroundImage: `url(${src})`
        }}
      />
    </div>
  );
};

export default ChromaGrid;
