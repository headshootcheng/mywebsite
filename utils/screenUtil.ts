import useMediaQuery from "@material-ui/core/useMediaQuery";
export const isMobile = (): boolean => useMediaQuery("(max-width: 768px)");
