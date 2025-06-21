declare interface Nav {
  title: string;
  ref?: React.RefObject<HTMLDivElement>;
  onTrigger: () => void;
}
