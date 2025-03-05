import { useRef } from 'react';
import { Layer } from '../../../types';
import ParallaxBackground from '../../effects/ParallaxBackground';
import image1 from '../../../assets/images/common/flyhigh-1.png';
import image2 from '../../../assets/images/common/flyhigh-2.png';
import image3 from '../../../assets/images/common/flyhigh-3.png';
import image4 from '../../../assets/images/common/flyhigh-4.png';
import image5 from '../../../assets/images/common/flyhigh-5.png';

const SectionFour: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const layers: Layer[] = [
    {
      image: image1,
      depth: 1,
    },
    {
      image: image2,
      depth: 0.8,
    },
    {
      image: image3,
      depth: 0.6,
    },
    {
      image: image4,
      depth: 0.4,
    },
    {
      image: image5,
      depth: 0.1,
    },
  ];

  return (
    <section className="Section-three relative" ref={sectionRef}>
      {/* Block One */}
      <div className="block-one relative h-screen w-screen overflow-hidden">
        <ParallaxBackground layers={layers} containerRef={sectionRef} />
        <div className="absolute bottom-0 h-[15vh] w-full bg-gradient-to-t from-[#101208] to-transparent" />
      </div>

      {/* Block Two */}
      <div className="block-two relative h-screen bg-[#101208]" />
    </section>
  );
};

export default SectionFour;
