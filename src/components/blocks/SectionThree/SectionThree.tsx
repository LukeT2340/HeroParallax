import { useRef } from 'react';
import { Layer } from '../../../types';
import ParallaxBackground from '../../effects/ParallaxBackground';
import image1 from '../../../assets/images/common/experience-1.png';
import image2 from '../../../assets/images/common/experience-2.png';
import image3 from '../../../assets/images/common/experience-3.png';
import image4 from '../../../assets/images/common/experience-4.png';
import image5 from '../../../assets/images/common/experience-5.png';

const SectionThree: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const layers: Layer[] = [
    {
      image: image1,
      depth: 0.3,
    },
    {
      image: image2,
      depth: 0.4,
    },
    {
      image: image3,
      depth: 0.5,
    },
    {
      copy: (
        <h1 className="mb-[100px] text-[8rem] font-bold text-nowrap text-orange-600">
          Welcome to New York!
        </h1>
      ),
      depth: 0.1,
    },

    {
      image: image4,
      depth: 0.6,
    },
    {
      image: image5,
      depth: 0.7,
    },
  ];

  return (
    <section
      className="Section-three relative bg-[#101208] pb-[100vh]"
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

export default SectionThree;
