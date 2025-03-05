import { RefObject, useEffect } from 'react';
import { Layer } from '../../../types';
import { processLayers, setupListener } from './utils';

interface Props {
  layers: Layer[];
  containerRef?: RefObject<HTMLDivElement>;
}

const ParallaxBackground: React.FC<Props> = ({ layers, containerRef }) => {
  layers = processLayers(layers);

  useEffect(() => {
    setupListener(layers, containerRef);
  }, []);

  return (
    <>
      {layers.map((layer, index) =>
        layer.image ? (
          <div
            className="pointer-events-none absolute inset-0 h-full w-full"
            ref={layer.ref}
            key={layer.image}
          >
            <img
              src={layer.image}
              alt="hero layer image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            ref={layer.ref}
            key={index}
          >
            <div ref={layer.ref}>{layer.copy}</div>
          </div>
        )
      )}
    </>
  );
};

export default ParallaxBackground;
