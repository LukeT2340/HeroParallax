import { lerp } from 'three/src/math/MathUtils.js';
import { RefObject, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layer } from '../../types';

interface Props {
  layers: Layer[];
  containerRef?: RefObject<HTMLDivElement>;
  depthOfField?: number;
}

const ParallaxBackground: React.FC<Props> = ({
  layers,
  depthOfField = 1,
  containerRef,
}) => {
  layers = processLayers(layers);

  useEffect(() => {
    setupListener(layers, containerRef);
  }, []);

  return (
    <>
      {layers.map((layer) => (
        <div
          className="pointer-events-none absolute inset-0 h-full w-full"
          ref={layer.ref}
          key={layer.image}
          style={{ filter: `blur(${layer.depth * depthOfField}px)` }}
        >
          <motion.img
            src={layer.image}
            alt="hero layer image"
            className="h-full w-full object-cover object-center"
            initial={{ filter: 'blur(20px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
          />
        </div>
      ))}
    </>
  );
};

// Adds a ref to each layer, sets the initial position and sorts based on depth
const processLayers = (layers: Layer[]) => {
  return layers
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
    .sort((a, b) => b.depth - a.depth);
};

// Parallax effect
const setupListener = (
  layers: Layer[],
  containerRef?: RefObject<HTMLDivElement>
) => {
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
    const normalizedScrollY = containerRef?.current
      ? -containerRef.current.getBoundingClientRect().top / window.innerHeight
      : window.scrollY / window.innerHeight;
    const shouldAnimate = normalizedScrollY < 1;

    if (shouldAnimate) {
      layers.forEach((layer) => {
        const imageElement = layer.ref?.current;
        const { position, depth } = layer;
        if (!imageElement || !position) return;

        position.currentX = lerp(position.currentX, position.targetX, 0.007);
        position.currentY = lerp(position.currentY, position.targetY, 0.007);

        const adjustedScale = 1 + depth * 0.3;

        const scrollOffset = normalizedScrollY * 100 * depth;

        const adjustedPositionY = position.currentY + depth * 15 + scrollOffset;

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
};

export default ParallaxBackground;
