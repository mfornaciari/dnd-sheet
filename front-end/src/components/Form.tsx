import type { FetchedData, CharacterValues } from "@/types";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "@/style/Form.css";
import { calculateLevel, findClassName, generateURL } from "@/helpers/formHelpers";
import { Container } from "@/components/Container";
import { TabStructure } from "@/components/TabStructure";
import { InputText } from "@/components/inputs/InputText";
import { InputNumber } from "@/components/inputs/InputNumber";
import { Select } from "@/components/inputs/Select";

type FormProps = {
  data: FetchedData;
}

const emptyValues = JSON.stringify({
  name: "",
  race: "0",
  characterClass: "0",
  experience: "0",
});

export function Form({ data }: FormProps) {
  const formMethods = useForm<CharacterValues>({
    mode: "onTouched",
    defaultValues: JSON.parse(localStorage.getItem("characterValues") || emptyValues),
  });

  const characterValues = formMethods.watch();

  useEffect(() => {
    localStorage.setItem("characterValues", JSON.stringify(characterValues));
  }, [characterValues]);

  const { races, characterClasses, levels } = data;
  const selectedClassId = formMethods.watch("characterClass");
  const selectedClassName = findClassName(characterClasses, selectedClassId);
  const characterExperience = parseInt(formMethods.watch("experience"));
  const currentLevel = calculateLevel(levels, characterExperience);
  const formValid = formMethods.formState.isValid;
  const downloadURL = generateURL(formMethods.getValues());

  async function handleFileChange(files: FileList | null) {
    if (files) {
      const currentFile = files[0];
      const textValues = await currentFile.text();
      const jsonValues: CharacterValues = JSON.parse(textValues);
      formMethods.reset(jsonValues);
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form>
        <section id="form-top">
          <InputText name="name" required />

          <Select name="race" optionData={races} required />

          <Select name="characterClass" optionData={characterClasses} required />

          <InputNumber name="experience" minValue="0" maxValue="999999" />

          <Container hiddenTitle="Nível">
            <strong className="text">Nível {currentLevel}</strong>
          </Container>

          <a
            role="button"
            id="save-button"
            href={formValid ? downloadURL : "#"}
            download={formValid ? formMethods.getValues("name") : undefined}
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
    </FormProvider>
  );
}
