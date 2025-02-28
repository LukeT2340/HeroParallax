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

        position.targetX = (1 - e.clientX * movingValue) / window.innerWidth;
        position.targetY = (1 - e.clientY * movingValue) / window.innerHeight;
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

          const adjustedScale = 1 + depth * 0.3;
          const adjustedPositionY =
            position.currentY +
            depth * 15 +
            (window.scrollY / window.innerHeight) * 100 * depth;
          imageElement.style.transform = `translate(${position.currentX}vw, ${adjustedPositionY}vh) scale(${adjustedScale})`;
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
          className="absolute inset-0 h-full w-full object-cover object-center"
          key={layer.image}
          ref={layer.ref}
        />
      ))}
    </>
  );
};

export default ParallaxBackground;
