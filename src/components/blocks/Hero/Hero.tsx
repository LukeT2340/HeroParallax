import { Layer } from '../../../types';
import ParallaxBackground from '../../effects/ParallaxBackground';
import image1 from '../../../assets/images/common/nature-1.png';
import image2 from '../../../assets/images/common/nature-2.png';
import image3 from '../../../assets/images/common/nature-3.png';
import image4 from '../../../assets/images/common/nature-4.png';
import image5 from '../../../assets/images/common/nature-5.png';
import image6 from '../../../assets/images/common/nature-6.png';

const Hero: React.FC = () => {
  const layers: Layer[] = [
    {
      image: image1,
      depth: 0.1,
    },
    {
      image: image2,
      depth: 0.3,
    },
    {
      image: image3,
      depth: 0.4,
    },
    {
      copy: (
        <h1 className="mr-[350px] mb-[250px] text-[8rem] font-bold text-nowrap text-white">
          Hello, World!
        </h1>
      ),
      depth: 0.75,
    },
    {
      image: image4,
      depth: 0.7,
    },
    {
      image: image5,
      depth: 0.9,
    },
    {
      image: image6,
      depth: 1,
    },
  ];

  return (
    <section className="hero relative bg-[#101208] pb-[100vh]">
      {/* Block One */}
      <div className="block-one relative h-screen w-screen overflow-hidden">
        <ParallaxBackground layers={layers} />
        <div className="absolute bottom-0 h-[15vh] w-full bg-gradient-to-t from-[#101208] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
