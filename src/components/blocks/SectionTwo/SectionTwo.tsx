import { useRef } from 'react';
import { Layer } from '../../../types';
import ParallaxBackground from '../../effects/ParallaxBackground';
import image1 from '../../../assets/images/common/snow-1.jpg';
import image2 from '../../../assets/images/common/snow-2.png';
import image3 from '../../../assets/images/common/snow-3.png';

const SectionTwo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const layers: Layer[] = [
    {
      image: image1,
      depth: 0.8,
    },
    {
      image: image2,
      depth: 0.3,
    },
    {
      copy: (
        <h1 className="mb-[100px] text-[8rem] font-bold text-black">
          Hello, World!
        </h1>
      ),
      depth: 0.6,
    },
    {
      image: image3,
      depth: 0.6,
    },
  ];

  return (
    <section
      className="Section-two relative bg-[#101208] pb-[100vh]"
      ref={sectionRef}
    >
      {/* Block One */}
      <div className="block-one relative h-screen w-screen overflow-hidden">
        <ParallaxBackground layers={layers} containerRef={sectionRef} />
        <div className="absolute top-0 h-[15vh] w-full bg-gradient-to-t from-transparent to-[#101208]" />
        <div className="absolute bottom-0 h-[15vh] w-full bg-gradient-to-t from-[#101208] to-transparent" />
      </div>
    </section>
  );
};

export default SectionTwo;
