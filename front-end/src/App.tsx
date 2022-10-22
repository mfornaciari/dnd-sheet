import '@/style/App.css';
import { GET_DATA } from '@/queries/getData';
import { QueryWrapper } from '@/components/QueryWrapper';
import { FormWrapper } from '@/components/FormWrapper';
import { InputText } from '@/components/inputs/InputText';
import { Select } from '@/components/inputs/Select';
import { InputNumber } from '@/components/inputs/InputNumber';
import { Container } from '@/components/Container';
import { TabStructure } from '@/components/TabStructure';

export default function App() {
  return (
    <QueryWrapper query={GET_DATA}>
      {data => (
        <FormWrapper data={data}>
          {({ currentLevel,
            downloadURL,
            getValues,
            handleFileChange,
            isValid,
            selectedClassName
          }) => (
            <>
              <section id="form-top">
                <InputText name="name" required />

                <Select name="race" optionData={data.races} required />

                <Select name="characterClass" optionData={data.characterClasses} required />

                <InputNumber name="experience" minValue="0" maxValue="999999" />

                <Container hiddenTitle="Nível">
                  <strong className="text">Nível {currentLevel}</strong>
                </Container>

                <a
                  role="button"
                  id="save-button"
                  href={isValid ? downloadURL : "#"}
                  download={isValid ? getValues("name") : undefined}
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
            </>
          )}
        </FormWrapper>
      )}
    </QueryWrapper>
  );
}
