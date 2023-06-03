import "./ListWithSections.css";
import { ContainerTitled } from "@/app/components";

type ListWithSectionsProps = {
  title: string;
  sectionNames: string[];
  listItemsBySection: JSX.Element[][];
};

export function ListWithSections({ title, sectionNames, listItemsBySection }: ListWithSectionsProps): JSX.Element {
  const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");
  const snakecasedSectionNames = sectionNames.map(name => name.toLowerCase().replace(/ /g, "_"));

  return (
    <ContainerTitled>
      <h1 id={snakecasedTitle} className="list-with-sections-title">
        {title}
      </h1>

      <ol className="list-with-sections" aria-labelledby={snakecasedTitle}>
        {listItemsBySection.map((listItemsGroup, index) => (
          <li key={sectionNames[index]} aria-labelledby={snakecasedSectionNames[index]}>
            <h2 id={snakecasedSectionNames[index]}>{sectionNames[index]}</h2>

            <ul>{listItemsGroup}</ul>
          </li>
        ))}
      </ol>
    </ContainerTitled>
  );
}
