import { Layer } from '../../../types';
import ParallaxBackground from '../../miscellaneous/ParallaxBackground';
import image1 from '../../../assets/images/common/nature-1.png';
import image2 from '../../../assets/images/common/nature-2.png';
import image3 from '../../../assets/images/common/nature-3.png';
import image4 from '../../../assets/images/common/nature-4.png';
import image5 from '../../../assets/images/common/nature-5.png';
import image6 from '../../../assets/images/common/nature-6.png';

const Hero: React.FC = () => {
  // Make sure to add the images in the correct order (from depth 0 to 1), that way z-index will work correctly
  const Layers: Layer[] = [
    {
      image: image1,
      depth: 0,
    },
    {
      image: image2,
      depth: 0.2,
    },
    {
      image: image3,
      depth: 0.3,
    },
    {
      image: image4,
      depth: 0.5,
    },
    {
      image: image5,
      depth: 0.85,
    },
    {
      image: image6,
      depth: 1,
    },
  ];

  return (
    <section className="hero relative">
      {/* Block One */}
      <div className="block-one relative h-screen w-screen overflow-hidden">
        <ParallaxBackground layers={Layers} />
        <div className="absolute bottom-0 h-[15vh] w-full bg-gradient-to-t from-[#101208] to-transparent" />
      </div>

      {/* Block Two */}
      <div className="block-two relative h-screen bg-[#101208]" />
    </section>
  );
};

export default Hero;
