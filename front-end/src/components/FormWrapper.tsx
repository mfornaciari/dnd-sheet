import type { CharacterClassName, CharacterValues, FetchedData } from "@/types";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "@/style/Form.css";
import { calculateLevel, findClassName, generateURL } from "@/helpers/formHelpers";

type FormChildrenArgs = Readonly<{
  currentLevel: number,
  downloadURL: string,
  getValues: (fieldName: string) => CharacterValues,
  handleFileChange: (files: FileList | null) => Promise<void>,
  isValid: boolean,
  selectedClassName: CharacterClassName | "characterClass",
}>

type FormProps = Readonly<{
  data: FetchedData;
  children: (arg: FormChildrenArgs) => ReactElement;
}>

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
  const selectedClassName: CharacterClassName | "characterClass" = findClassName(characterClasses, selectedClassId);
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

  const childrenArguments = {
    currentLevel: currentLevel,
    downloadURL: downloadURL,
    getValues: methods.getValues,
    handleFileChange: handleFileChange,
    isValid: methods.formState.isValid,
    selectedClassName: selectedClassName,
  }

  return (
    <FormProvider {...methods}>
      <form>
        {children(childrenArguments)}
      </form>
    </FormProvider>
  );
}
