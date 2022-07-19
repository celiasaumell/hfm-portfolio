import { useState, useEffect } from "react";


export default function useWindowDimensions(size) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
      // detect window screen width function
      function handleResize() {
        setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width > size;
}
