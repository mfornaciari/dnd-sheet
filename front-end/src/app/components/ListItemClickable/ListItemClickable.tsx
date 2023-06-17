import type { MouseEventHandler, PropsWithChildren } from "react";

type ListItemClickableProps = {
  handleClick: MouseEventHandler;
};

export function ListItemClickable({ handleClick, children }: PropsWithChildren<ListItemClickableProps>): JSX.Element {
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
