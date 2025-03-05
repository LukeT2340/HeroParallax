import { useRef } from 'react';
import LocomotiveParallax from './js/parallax';
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import Hero from './components/blocks/Hero';
import SectionTwo from './components/blocks/SectionTwo';
import SectionThree from './components/blocks/SectionThree';
import SectionFour from './components/blocks/SectionFour';

const App = () => {
  const locoScrollRef = useRef<HTMLElement>(null);

  return (
    <div>
      <main>
        <Header />
        <article>
          <LocomotiveParallax locoScrollRef={locoScrollRef}>
            <Hero />
            <SectionTwo />
            <SectionThree />
            {/* <SectionFour /> */}
          </LocomotiveParallax>
        </article>
        <Footer />
      </main>
    </div>
  );
};

export default App;
