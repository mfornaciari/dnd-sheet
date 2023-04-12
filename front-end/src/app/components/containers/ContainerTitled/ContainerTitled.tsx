import type { PropsWithChildren } from "react";

type ContainerProps = {
  title: string;
};

export function ContainerTitled({ title, children }: PropsWithChildren<ContainerProps>): JSX.Element {
  const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");

  return (
    <div className="container titled" role="presentation">
      <h1 id={snakecasedTitle} className="title for-container-titled">
        {title}
      </h1>

      {children}
    </div>
  );
}
