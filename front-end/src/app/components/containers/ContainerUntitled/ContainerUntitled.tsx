import type { PropsWithChildren } from "react";

type ContainerUntitledProps = {
  ariaLabel: string;
}

export function ContainerUntitled({
  ariaLabel,
  children
}: PropsWithChildren<ContainerUntitledProps>) {
  return (
    <div
      className="container hidden-titled"
      role="region"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
