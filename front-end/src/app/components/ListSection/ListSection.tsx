import "./ListSection.css";

type ListSectionProps = {
  title: string;
  elements: JSX.Element[];
};

export function ListSection({ title, elements }: ListSectionProps): JSX.Element {
  const snakecasedTitle = title.toLowerCase().replace(/ /g, "_");

  return (
    <li className="list-section" aria-labelledby={snakecasedTitle}>
      <h2 id={snakecasedTitle}>{title}</h2>

      <ul>
        {elements.map(element => (
          <li key={element.key}>{element}</li>
        ))}
      </ul>
    </li>
  );
}
