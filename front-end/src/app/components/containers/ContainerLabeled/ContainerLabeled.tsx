import type { PropsWithChildren } from "react";

type ContainerLabeledProps = {
  label: string;
  labelFor: string;
  invalid?: boolean;
};

export function ContainerLabeled({
  label,
  labelFor,
  invalid,
  children
}: PropsWithChildren<ContainerLabeledProps>) {
  let className = "container";
  if (invalid) className += " invalid";

  return (
    <div
      className={className}
      role="presentation"
    >
      <label htmlFor={labelFor} className="title">
        <strong>{label}</strong>
      </label>

      {children}
    </div>
  );
}
