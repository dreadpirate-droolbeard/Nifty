import React, { useRef, useEffect, RefObject } from "react";

type Props = {
  onBottomHit: () => void;
  // isLoading: boolean;
  // hasMoreData: boolean;
  // loadOnMount: boolean;
  targetElement: RefObject<HTMLElement>;
};


//https://typeofnan.dev/creating-a-react-infinite-scroll-component/
export const InfiniteScroll: React.FC<Props> = ({
  onBottomHit,
  targetElement,
  // isLoading,
  // hasMoreData,
  // loadOnMount,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerClassName= 'infinite-scroll-container';

  const options = {
    root: document.querySelector(`.${scrollContainerClassName}`),
    rootMargin: "0px",
    threshold: 1.0
  };

  const observer: IntersectionObserver = new IntersectionObserver(([entry]) => triggerObserver(entry), options);

  useEffect( () => {
    console.log('loadingRef.current', targetElement)

    if(targetElement.current){
      observer.observe(targetElement.current);
    }

    return observer.disconnect; //cleanup observer
  }, [])
  
  const triggerObserver = (entry: IntersectionObserverEntry): void => {
    console.log("triggerObeserver");
    if(entry.isIntersecting) {
      console.log('entry is intersecting')
      onBottomHit();
    }
  }

  return (
    <div className={scrollContainerClassName} ref={contentRef}>
      {children}
    </div>
  )
};