import { useEffect, useRef } from 'react';
import { isUndefined } from 'utils/isUndefined';

const MAX_FPS = 60;

export const useAnimationFrame = (callback: FrameRequestCallback) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (isUndefined(previousTimeRef.current)) {
      callback(0);
    }

    const deltaTime = time - (previousTimeRef.current ?? 1000000000);
    callback(deltaTime > 1000 / MAX_FPS ? deltaTime : 0);

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, []);
};
