import type { CharacterClassName, CharacterValues, FetchedData } from "@/types";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "@/style/Form.css";
import { calculateLevel, findClassName, generateURL } from "@/helpers/formHelpers";

type FormProps = {
  data: FetchedData;
  children: (
    currentLevel: number,
    data: FetchedData,
    downloadURL: string,
    getValues: (fieldName: string) => CharacterValues,
    handleFileChange: (files: FileList | null) => Promise<void>,
    isValid: boolean,
    selectedClassName: CharacterClassName | "characterClass",
  ) => ReactElement;
}

const emptyValues = JSON.stringify({
  name: "",
  race: "0",
  characterClass: "0",
  experience: "0",
});

export function FormWrapper({ data, children }: FormProps) {
  const methods = useForm<CharacterValues>({
    mode: "onTouched",
    defaultValues: JSON.parse(localStorage.getItem("characterValues") || emptyValues),
  });

  const characterValues = methods.watch();

  useEffect(() => {
    localStorage.setItem("characterValues", JSON.stringify(characterValues));
  }, [characterValues]);

  const { characterClasses, levels } = data;
  const selectedClassId = methods.watch("characterClass");
  const selectedClassName = findClassName(characterClasses, selectedClassId);
  const characterExperience = parseInt(methods.watch("experience"));
  const currentLevel = calculateLevel(levels, characterExperience);
  const downloadURL = generateURL(methods.getValues());

  async function handleFileChange(files: FileList | null) {
    if (files) {
      const currentFile = files[0];
      const textValues = await currentFile.text();
      const jsonValues: CharacterValues = JSON.parse(textValues);
      methods.reset(jsonValues);
    }
  }

  return (
    <FormProvider {...methods}>
      <form>
        {children(currentLevel, data, downloadURL, methods.getValues, handleFileChange, methods.formState.isValid, selectedClassName)}
      </form>
    </FormProvider>
  );
}
