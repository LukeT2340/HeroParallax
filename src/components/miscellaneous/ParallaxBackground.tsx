import { lerp } from 'three/src/math/MathUtils.js';
import { useEffect, useRef } from 'react';
import { Layer } from '../../types';

interface Props {
  layers: Layer[];
}

const ParallaxBackground: React.FC<Props> = ({ layers }) => {
  // Add reference and position properties to each layer
  layers = layers
    .map((layer) => ({
      ...layer,
      ref: useRef<HTMLImageElement>(null),
      position: {
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
      },
    }))
    .reverse();

  useEffect(() => {
    const parallax = (e: MouseEvent) => {
      layers.forEach((layer) => {
        const { depth, position } = layer;

        if (!position) return;

        const movingValue = depth * 10;

        position.targetX = (window.innerWidth - e.clientX * movingValue) / 100;
        position.targetY = (window.innerHeight - e.clientY * movingValue) / 100;
      });
    };

    const animate = () => {
      if (window.scrollY / Math.max(window.innerHeight, 950) < 1) {
        layers.forEach((layer) => {
          const imageElement = layer.ref?.current;
          const { position, depth } = layer;
          if (!imageElement || !position) return;

          position.currentX = lerp(position.currentX, position.targetX, 0.007);
          position.currentY = lerp(position.currentY, position.targetY, 0.007);

          const adjustedScale = 1 + depth * 0.2;

          const adjustedPositionY =
            position.currentY +
            +((window.scrollY * depth * 1) / window.innerHeight) * 1000 +
            depth * 120;

          imageElement.style.transform = `translate(${position.currentX}px, ${adjustedPositionY}px) scale(${adjustedScale})`;
        });
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', parallax);
    animate();

    return () => {
      document.removeEventListener('mousemove', parallax);
    };
  }, []);
  return (
    <>
      {layers.map((layer) => (
        <img
          src={layer.image}
          alt="hero layer image"
          className="absolute inset-0 h-full w-full object-cover"
          key={layer.image}
          ref={layer.ref}
          style={{ scale: 1 + layer.depth * 0.2 }}
        />
      ))}
    </>
  );
};

export default ParallaxBackground;
