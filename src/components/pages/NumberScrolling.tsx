import React, { useEffect, useRef, useState } from "react";
import { InfiniteScroll } from "../composites/InfiniteScroll";

const NUMBERS_PER_PAGE = 100;

export function NumberScrolling() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const loadingRef = useRef<HTMLDivElement>(null);

  const hasMoreData = numbers.length < 1000;

  useEffect( () => {
    console.log("comp did mount")
  }, []);

  useEffect( () => {
    console.log("page updated:", page)
    if(hasMoreData){
      setTimeout(() => {
        const newNumbers = new Array(NUMBERS_PER_PAGE)
          .fill(1)
          .map((_, i) => page * NUMBERS_PER_PAGE + i);
        setNumbers((nums) => [...nums, ...newNumbers]);
        setLoading(false);
      }, 300);
    }
  }, [page]);

  const loadMoreNumbers = (): void => {
    console.log('Load More Numbers - init - page:', page)
    setPage((page) => page + 1);
  };

  return (
    <InfiniteScroll
      // hasMoreData={hasMoreData}
      // isLoading={loading}
      onBottomHit={loadMoreNumbers}
      // loadOnMount={true}
      targetElement={loadingRef}
    >
      <ul>
        {numbers.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <div
        className="loading-div"
        ref={loadingRef}
      >
        {hasMoreData ? <span >Loading...</span> : <span>End Of Dataset</span>}
      </div>
    </InfiniteScroll>
  );
}