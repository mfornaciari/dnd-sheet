import type { PropsWithChildren, ReactElement } from "react";
// import "./Container.css";
import i18next from "i18next";

type ContainerProps = {
  title: ReactElement | string;
  invalid?: boolean;
};

export function Container({
  title,
  invalid,
  children
}: PropsWithChildren<ContainerProps>) {
  const titleVisible = !(typeof title === "string");
  let className = "container";
  if (!titleVisible) className += " hidden-titled";
  if (invalid) className += " invalid";
  const role = titleVisible ? "presentation" : "region";
  const ariaLabel = titleVisible ? undefined : i18next.t(title);

  return (
    <div
      className={className}
      role={role}
      aria-label={ariaLabel}
    >
      {titleVisible && title}
      {children}
    </div>
  );
}
