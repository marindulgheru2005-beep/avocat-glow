import { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -50, y: -50 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
    }
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  const onMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [role="button"]')) {
      setHovering(true);
    }
  }, []);

  const onMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, [role="button"]')) {
      setHovering(false);
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isTouch, onMouseMove, onMouseOver, onMouseOut, onMouseLeave]);

  if (isTouch) return null;

  const size = hovering ? 32 : 14;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
        transition: 'transform 0.08s ease-out, width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
        width: size,
        height: size,
        borderRadius: '50%',
        border: hovering ? 'none' : '2px solid #C9A84C',
        backgroundColor: hovering ? 'rgba(201, 168, 76, 0.5)' : 'transparent',
        opacity: visible ? 1 : 0,
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default CustomCursor;
