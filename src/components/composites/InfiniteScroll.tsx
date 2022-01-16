import React, { useState, useRef, useEffect, Component } from "react";
import { useIntersectionObserver } from "./IntersectionObserver";

type Props = {
  onBottomHit: () => void;
  isLoading: boolean;
  hasMoreData: boolean;
  loadOnMount: boolean;
};

function isBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false;
  }
  const footerHeight = document.querySelector(".footer")?.getBoundingClientRect().height;
  const scrollContainerHeight = ref.current.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;
  // console.log('isBottom - rect.bottom:',  scrollContainerHeight, 'window.height:', windowHeight - footerHeight! - 1)
  const scrollTop = ref.current.scrollTop;
  const scrollheight = ref.current.scrollHeight;

  // console.log('isBottom - scrollLocation:', ref.current.scrollTop, "scrollheight",scrollheight)
  return scrollContainerHeight <= windowHeight - footerHeight! - 1;
}

// function useMyCustomHook<T extends HTMLElement>(){
//   const myRef = useRef<T>(null)

//   // do something with the ref, e.g. adding event listeners

//   return {ref: myRef}
// }

//https://typeofnan.dev/creating-a-react-infinite-scroll-component/
export const InfiniteScroll: React.FC<Props> = ({
  onBottomHit,
  isLoading,
  hasMoreData,
  loadOnMount,
  children,
}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [isInt, setIsInt] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  // // const {ref: loadingRef} = useMyCustomHook<HTMLDivElement>();
  
  const scrollContainerClassName= 'infinite-scroll-container';

  const options = {
    root: document.querySelector(`.${scrollContainerClassName}`),
    rootMargin: "0px",
    threshold: 1.0
  };


  // const target = document.querySelector(".loading-div") as HTMLElement;
  useEffect( () => {
    console.log('loadingRef.current', loadingRef.current)
    const observer: IntersectionObserver = new IntersectionObserver(onBottomHit, options);
    observer.observe(loadingRef.current!);
  }, [])
  

  // const ref = useRef<Element>(null)
  // const isIntersecting = useIntersectionObserver(loadingRef, options, false);

  // useEffect( () => {
  //   setIsInt(useIntersectionObserver(loadingRef, options))
  // }, []);

  // useEffect( () => {
  //   console.log('useEffect isInt:', isIntersecting)
  //   onBottomHit();
  // }, [isIntersecting]);

  // ***** Kind of working **** //
  // useEffect(() => {
  //   console.log('useEffect 1')
  //   if (loadOnMount && initialLoad) {
  //     onBottomHit();
  //     setInitialLoad(false);
  //   }
  // }, [onBottomHit, loadOnMount, initialLoad]);

  // useEffect(() => {
  //   console.log('useEffect 2')
  //   const onScroll = (): void => {
  //     console.log('onScroll')
  //     // if(useIntersectionObserver(loadingRef, options, false)){
  //     if (!isLoading && hasMoreData && isBottom(contentRef)) {
  //       console.warn('isBottom and more data')
  //       onBottomHit();
  //     }
  //   };
  //   document.querySelector(`.${scrollContainerClassName}`)?.addEventListener('scroll', onScroll);
  //   // document.addEventListener('scroll', onScroll);
  //   // return (): void => document.removeEventListener('scroll', onScroll);
  //   return (): void => document.querySelector(`.${scrollContainerClassName}`)?.removeEventListener('scroll', onScroll);
  // }, [onBottomHit, isLoading, hasMoreData]);

  return (
    <div className={scrollContainerClassName} ref={contentRef}>
      {children}
      <div
        className="loading-div"
        ref={loadingRef}
      >
        <span >Loading...</span>
      </div>
    </div>
  )
};


//**** Class Based, not working? Not really attempted */
// interface iInterfaceScrollerState{
//   photos: [],
//   loading: boolean,
//   page: number,
//   prevY: number
// }

// // //https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs
// export class InfiniteScroller extends Component<unknown, iInterfaceScrollerState> {
//   private observer: any; 
//   private loadingRef: any; 

//   constructor(props: any) {
//     super(props);

//     this.state = {
//       photos: [],
//       loading: false,
//       page: 0,
//       prevY: 0
//     };

//     this.loadingRef = React.createRef();
//   }

//   componentDidMount() {
//     this.getPhotos(this.state.page);

//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 1.0
//     };
    
    
//     this.observer = new IntersectionObserver(
//       this.handleObserver.bind(this),
//       options
//     );
//     this.observer.observe(this.loadingRef);
//   }

//   handleObserver(entities: { boundingClientRect: { y: any; }; }[], observer: any) {
//     const y = entities[0].boundingClientRect.y;
//     if (this.state.prevY > y) {
//       const lastPhoto = this.state.photos[this.state.photos.length - 1];
//       const curPage = lastPhoto.albumId;
//       this.getPhotos(curPage);
//       this.setState({ page: curPage });
//     }
//     this.setState({ prevY: y });
//   }
//   render() {

//     // Additional css
//     const loadingCSS = {
//       height: "100px",
//       margin: "30px"
//     };

//     // To change the loading icon behavior
//     const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

//     return (
//       <div className="container">
//         <div style={{ minHeight: "800px" }}>
//           {this.state.photos.map(user => (
//             <img src={user.url} height="100px" width="200px" />
//           ))}
//         </div>
//         <div
//           ref={loadingRef => (this.loadingRef = loadingRef)}
//           style={loadingCSS}
//         >
//           <span style={loadingTextCSS}>Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   getPhotos(page) {
//     this.setState({ loading: true });
//     axios
//       .get(
//         `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
//       )
//       .then(res => {
//         this.setState({ photos: [...this.state.photos, ...res.data] });
//         this.setState({ loading: false });
//       });
//   }
// }

