/**
 * Better than using useMediaQuery from
 * react-responsive as it updates on resize
 */

import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1025);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1025);

    document.addEventListener('resize', handleResize);

    return () => document.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default useMobile;
