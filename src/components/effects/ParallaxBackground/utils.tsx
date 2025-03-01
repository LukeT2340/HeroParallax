import { RefObject, useRef } from 'react';
import { Layer } from '../../../types';
import { lerp } from 'three/src/math/MathUtils.js';

// Adds a ref to each layer, sets the initial position and sorts based on depth
export const processLayers = (layers: Layer[]) => {
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

export const setupListener = (
  layers: Layer[],
  containerRef?: RefObject<HTMLDivElement>
) => {
  let mouseX = 0;
  let mouseY = 0;

  // Update mouse position
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const animate = () => {
    const normalizedScrollY = containerRef?.current
      ? -containerRef.current.getBoundingClientRect().top / window.innerHeight
      : window.scrollY / window.innerHeight;

    const shouldAnimate = normalizedScrollY < 1 && normalizedScrollY > -1;

    if (shouldAnimate) {
      layers.forEach((layer) => {
        const imageElement = layer.ref?.current;
        const { position, depth } = layer;
        if (!imageElement || !position) return;

        // Calculate mouse-based target positions (previously in parallax function)
        const movingValue = depth * 10;
        position.targetX = (1 - mouseX * movingValue) / window.innerWidth;
        position.targetY = (1 - mouseY * movingValue) / window.innerHeight;

        // Interpolate current position towards target
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

  document.addEventListener('mousemove', handleMouseMove);
  animate();

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
};
