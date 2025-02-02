import React, { useState, useEffect, useRef } from 'react';
// import useExternalScripts from '../../hooks/useExternalScripts'

interface VideoProps {
  scriptUrl: string;
  playerId: string;
  videoId: string;
  className?: string;
}

const VideoJS = React.forwardRef((props: any, ref: any) =>
  React.createElement('video-js', { ...props, ref })
);

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

const Video = ({ scriptUrl, playerId, videoId, className }: VideoProps) => {
  const scriptLoaded = useExternalScripts(scriptUrl);
  const videoRef = useRef<HTMLDivElement>(null);

  const videoOptionsObserver = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  useEffect(() => {
    if (!scriptLoaded) return;

    const videojs = (window as any).videojs;

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const videoID = video.getAttribute('id');
          // @ts-ignore
          const player = videojs.getPlayer(videoID);

          if (player.currentTime() !== 0 || player.currentTime() === 0) {
            player.ready(async () => {
              const promise = player.play();
              if (promise !== undefined) {
                promise.catch(() => {
                  player.play();
                  player.mute();
                });
              }
            });
          }
        } else {
          // @ts-ignore
          if (window.videojs) {
            const video = entry.target;
            const videoID = video.getAttribute('id');
            const player = videojs.getPlayer(videoID);
            if (!player.paused()) {
              player.pause();
            }
          }
        }
      });
    }, videoOptionsObserver);

    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        videoObserver.unobserve(videoRef.current);
      }
    };
  }, [scriptLoaded]);

  return (
    <div className={`${className}`}>
      <VideoJS
        ref={videoRef}
        data-account="6165065566001"
        data-player={playerId}
        data-embed="default"
        controls=""
        data-video-id={videoId}
        data-playlist-id=""
        data-application-id=""
        class="vjs-fluid"
        muted
        loop
      />
      <h3 className="sr-only">Video</h3>
    </div>
  );
};

export default Video;
