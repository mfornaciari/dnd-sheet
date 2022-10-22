import type { FetchedData } from '@/types';
import '@/style/App.css';
import { useQuery } from '@apollo/client';
import { useCharacterForm } from '@/hooks/useCharacterForm';
import { GET_DATA } from '@/queries/getData';
import { Container } from '@/components/Container';
import { StatusMessage } from '@/components/StatusMessage';
import { TabStructure } from '@/components/TabStructure';
import { InputNumber } from '@/components/inputs/InputNumber';
import { InputText } from '@/components/inputs/InputText';
import { Select } from '@/components/inputs/Select';

export default function App() {
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
          error={errors.name}
          register={register}
          required
        />

        <Select
          name="race"
          error={errors.race}
          optionData={data.races}
          register={register}
          required
        />

        <Select
          name="characterClass"
          error={errors.characterClass}
          optionData={data.characterClasses}
          register={register}
          required
        />

        <InputNumber
          name="experience"
          error={errors.experience}
          minValue="0"
          maxValue="999999"
          register={register}
        />

        <Container hiddenTitle="Nível">
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
