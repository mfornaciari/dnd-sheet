import type { FetchedData } from "@/types";
import "./Form.css";
import { useCharacterForm } from "@/app/hooks";
import { ContainerUntitled, InputNumber, InputText, Select, TabStructure } from "@/app/components";

type FormProps = {
  data: FetchedData;
}

export function Form({ data }: FormProps) {
  const {
    characterName,
    currentLevel,
    downloadURL,
    errors,
    handleFileChange,
    isValid,
    register,
    selectedClassName,
  } = useCharacterForm(data);

  return (
    <form aria-label="Formulário">
      <section id="form-top">
        <InputText
          name="name"
          invalid={errors.name ? true : false}
          register={register}
          required
        />

        <Select
          name="race"
          invalid={errors.race ? true : false}
          optionData={data.races}
          register={register}
          required
        />

        <Select
          name="characterClass"
          invalid={errors.characterClass ? true : false}
          optionData={data.characterClasses}
          register={register}
          required
        />

        <InputNumber
          name="experience"
          invalid={errors.experience ? true : false}
          minValue="0"
          maxValue="999999"
          register={register}
          required
        />

        <ContainerUntitled ariaLabel="Nível">
          <strong className="text">Nível {currentLevel}</strong>
        </ContainerUntitled>

        <a
          role="button"
          id="save-button"
          href={isValid ? downloadURL : "#"}
          download={isValid ? characterName : undefined}
          className="top-button"
        >
          <strong>Salvar</strong>
        </a>

        <label role="button" htmlFor="loading-input" className="top-button">
          <strong>Carregar</strong>
        </label>
        <input
          type="file"
          id="loading-input"
          accept=".json"
          onChange={event => handleFileChange(event.currentTarget.files)}
          hidden
        />
      </section>

      <TabStructure selectedClassName={selectedClassName} />
    </form>
  );
}
