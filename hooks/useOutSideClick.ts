import { useEffect, useRef } from "react";

type Handler = () => void;

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  listenCapturing: boolean = true,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Kiểm tra nếu click nằm ngoài phần tử đang ref
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    // Chuyển sang mousedown để xử lý lỗi "drag/copy text"
    document.addEventListener("mousedown", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("mousedown", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
