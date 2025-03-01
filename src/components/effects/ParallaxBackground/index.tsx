import { RefObject, useEffect } from 'react';
import { Layer } from '../../../types';
import { processLayers, setupListener } from './utils';

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
          <img
            src={layer.image}
            alt="hero layer image"
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}
    </>
  );
};

export default ParallaxBackground;
