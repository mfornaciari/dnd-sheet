import type { PropsWithChildren } from "react";

type ContainerProps = {
  title: string;
  extraClass?: string;
};

export function ContainerTitled({ title, extraClass, children }: PropsWithChildren<ContainerProps>): JSX.Element {
  const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");

  return (
    <div className={`container titled ${extraClass ?? ""}`} role="presentation">
      <h1 id={snakecasedTitle} className="title for-container-titled">
        {title}
      </h1>

      {children}
    </div>
  );
}
