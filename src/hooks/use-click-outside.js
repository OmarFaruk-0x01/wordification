import { useRef } from "react";
import { useEffect } from "react";

export default function useOnClickOutside(handler, mouseEvent = "mousedown") {
  const ref = useRef();

  const onEventFire = (event) => {
    const el = ref?.current;
    if (!el || el.contains(event.target)) {
      return;
    }
    handler(event);
  };

  useEffect(() => {
    window.addEventListener(mouseEvent, onEventFire);
    return () => {
      window.removeEventListener(mouseEvent, onEventFire);
    };
  }, [mouseEvent]);

  return { ref };
}
