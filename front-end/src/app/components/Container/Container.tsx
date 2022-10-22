import type { PropsWithChildren } from "react";
import "./Container.css";
import i18next from "i18next";

type ContainerProps = {
  hiddenTitle?: string;
  invalid?: boolean;
};

export function Container({ hiddenTitle, invalid, children }: PropsWithChildren<ContainerProps>) {
  let className = "container";
  if (hiddenTitle) className += " hidden-titled";
  if (invalid) className += " invalid";
  const role = hiddenTitle ? "region" : "presentation";
  const ariaLabel = hiddenTitle ? i18next.t(hiddenTitle) : undefined;

  return (
    <div className={className} role={role} aria-label={ariaLabel}>
      {children}
    </div>
  );
}
