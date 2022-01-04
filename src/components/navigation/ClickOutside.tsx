import { useEffect, RefObject } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  closeMenu: () => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", listener);
    return (): void => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, closeMenu]);
};
