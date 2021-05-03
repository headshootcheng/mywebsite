import { useMedia } from "react-use";
export const isMobile = (): boolean => useMedia("(max-width: 768px)");
