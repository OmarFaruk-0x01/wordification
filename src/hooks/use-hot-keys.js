import { useEffect } from "react";

const useHotkeys = (hotkeys) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      hotkeys.forEach(([key, action]) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          action();
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotkeys]);
};

export default useHotkeys;
