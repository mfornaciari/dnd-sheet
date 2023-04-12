import "./ListWithSections.css";
import { ContainerTitled } from "@/app/components";

type ListWithSectionsProps = {
  title: string;
  sectionNames: string[];
  data: string[][];
};

export function ListWithSections({ title, sectionNames, data }: ListWithSectionsProps): JSX.Element {
  const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");
  const snakecasedSectionNames = sectionNames.map(name => name.toLowerCase().replace(/ /g, "_"));

  return (
    <ContainerTitled title={title}>
      <ol className="list-with-sections" aria-labelledby={snakecasedTitle}>
        {data.map((group, index) => (
          <li key={sectionNames[index]} aria-labelledby={snakecasedSectionNames[index]}>
            <h2 id={snakecasedSectionNames[index]}>{sectionNames[index]}</h2>

            <ul>
              {group.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </ContainerTitled>
  );
}
