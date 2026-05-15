import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      if (!hasMoved) setHasMoved(true);
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', addHover);
    window.addEventListener('mouseup', removeHover);

    // Detect hoverable elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor-hover], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    let raf;
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      // Trail follows with lerp
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', addHover);
      window.removeEventListener('mouseup', removeHover);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hasMoved]);

  if (!hasMoved) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
            hovering ? 'w-12 h-12 opacity-40' : 'w-3 h-3 opacity-100'
          }`}
        />
      </div>
      {/* Trail ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ease-out ${
            hovering
              ? 'w-16 h-16 border-accent-cyan/60'
              : 'w-8 h-8 border-white/30'
          }`}
        />
      </div>
    </>
  );
}
