import { useState } from "react";

export const useDeckInit = () => {
  const [first, setfirst] = useState("useDeckInit");
  console.log(first);
};
