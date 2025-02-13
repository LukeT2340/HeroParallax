import { useEffect, useState } from 'react';

const useExternalScripts = (url: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return loaded;
};

export default useExternalScripts;
