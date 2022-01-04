import React, { MutableRefObject, useEffect, useRef } from 'react';

// https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// https://gist.github.com/Danziger/336e75b6675223ad805a88c2dfdcfd4a
export default function useTimeout( callback: React.EffectCallback, delay: number | null ): MutableRefObject<number | null> {
  const timeoutRef = useRef< number | null> (null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tick = (): any => savedCallback.current();
      timeoutRef.current = window.setTimeout(tick, delay);
      return (): void => window.clearTimeout(timeoutRef.current || 0);
    }
  }, [delay]);

  return timeoutRef;
}
