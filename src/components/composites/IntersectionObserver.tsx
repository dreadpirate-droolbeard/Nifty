import React, { useEffect, useState, useRef, MutableRefObject } from "react";

//https://dev.to/anxinyang/easy-lazy-loading-with-react-intersection-observer-api-1dll
export function useIntersectionObserver(
  ref: MutableRefObject<Element | null>,
  options: IntersectionObserverInit = {},
  forward = true
): boolean {

  const [element, setElement] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<null | IntersectionObserver>(null);

  const cleanOb = ():void => {
    if (observer.current) {
      observer.current.disconnect()
    }
  }

  useEffect(() => {
      setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (!element) return;
    cleanOb()
    const ob = observer.current = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      if (!forward) {
        setIsIntersecting(isElementIntersecting)
      } else if (forward && !isIntersecting && isElementIntersecting) {
        setIsIntersecting(isElementIntersecting);
        cleanOb()
      }
    }, { ...options })
    ob.observe(element);
    return ():void => {
      cleanOb()
    }
  }, [element, options ])


  return isIntersecting;
}
