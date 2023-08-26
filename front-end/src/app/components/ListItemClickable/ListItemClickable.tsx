import type { MouseEventHandler, PropsWithChildren } from "react";

type ListItemClickableProps = {
  onClick: MouseEventHandler;
};

export function ListItemClickable({ onClick, children }: PropsWithChildren<ListItemClickableProps>): JSX.Element {
  return (
    <li>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
