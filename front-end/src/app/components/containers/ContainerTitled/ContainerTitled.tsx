import type { PropsWithChildren } from "react";

export function ContainerTitled({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="container" role="presentation">
      {children}
    </div>
  );
}
