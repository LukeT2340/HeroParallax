import { useRef } from 'react';
import { Layer } from '../../../types';
import ParallaxBackground from '../../effects/ParallaxBackground';
import image1 from '../../../assets/images/common/snow-1.jpg';
import image2 from '../../../assets/images/common/snow-2.png';
import image3 from '../../../assets/images/common/snow-3.png';

const SectionTwo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const Layers: Layer[] = [
    {
      image: image1,
      depth: 0.6,
    },
    {
      image: image2,
      depth: 0,
    },
    {
      image: image3,
      depth: 0.4,
    },
  ];

  return (
    <section className="Section-two relative" ref={sectionRef}>
      {/* Block One */}
      <div className="block-one relative h-screen w-screen overflow-hidden">
        <ParallaxBackground
          layers={Layers}
          depthOfField={1.5}
          containerRef={sectionRef}
        />
        <div className="absolute bottom-0 h-[15vh] w-full bg-gradient-to-t from-[#101208] to-transparent" />
      </div>

      {/* Block Two */}
      <div className="block-two relative h-screen bg-[#101208]" />
    </section>
  );
};

export default SectionTwo;
