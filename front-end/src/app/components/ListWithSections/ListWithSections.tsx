import type { SectionObject } from "@/types";
import { ListSection } from "../ListSection/ListSection";
import "./ListWithSections.css";
import { ContainerTitled } from "@/app/components";

type ListWithSectionsProps = {
  title: string;
  sectionObjects: SectionObject[];
};

export function ListWithSections({ title, sectionObjects }: ListWithSectionsProps): JSX.Element {
  const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");

  return (
    <ContainerTitled>
      <h1 id={snakecasedTitle} className="list-with-sections-title">
        {title}
      </h1>

      <ol className="list-with-sections" aria-labelledby={snakecasedTitle}>
        {sectionObjects.map(object => {
          const { title, elements } = object;
          const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");
          return <ListSection key={snakecasedTitle} title={title} elements={elements} />;
        })}
      </ol>
    </ContainerTitled>
  );
}
