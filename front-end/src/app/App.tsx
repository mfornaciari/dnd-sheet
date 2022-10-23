import type { FetchedData } from "@/types";
import "./App.css";
import { useQuery } from "@apollo/client";
import { useCharacterForm } from "@/app/hooks";
import { GET_DATA } from "@/app/queries";
import {
  Container,
  InputNumber,
  InputText,
  Select,
  StatusMessage,
  TabStructure,
} from "@/app/components";


export function App() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);
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

  if (loading) return <StatusMessage message="loading" />;
  if (error || !data) return <StatusMessage message="error" />;

  return (
    <form>
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

        <Container title="Nível">
          <strong className="text">Nível {currentLevel}</strong>
        </Container>

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
