import type { CharacterClassName, CharacterValues, FetchedData } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  calculateLevel,
  findClassName,
  generateURL,
} from "@/app/hooks/useCharacterForm/helpers/useCharacterFormHelpers";

const emptyValues = JSON.stringify({
  name: "",
  race: "0",
  characterClass: "0",
  experience: "0",
});

export function useCharacterForm(data: FetchedData) {
  const { formState: { errors, isValid }, getValues, register, reset, watch } = useForm({
    mode: "onTouched",
    defaultValues: JSON.parse(localStorage.getItem("characterValues") || emptyValues),
  });

  const characterValues = watch();

  useEffect(() => {
    localStorage.setItem("characterValues", JSON.stringify(characterValues));
  }, [characterValues]);

  const { characterClasses, levels } = data;
  const characterName = watch("name");
  const selectedClassId = watch("characterClass");
  const selectedClassName: CharacterClassName | "characterClass" = findClassName(characterClasses, selectedClassId);
  const characterExperience = parseInt(watch("experience"));
  const currentLevel = calculateLevel(levels, characterExperience);
  const downloadURL = generateURL(getValues());

  async function handleFileChange(files: FileList | null) {
    if (files) {
      const currentFile = files[0];
      const textValues = await currentFile.text();
      const jsonValues: CharacterValues = JSON.parse(textValues);
      reset(jsonValues);
    }
  }

  return ({
    characterName,
    currentLevel,
    downloadURL,
    errors,
    handleFileChange,
    isValid,
    register,
    selectedClassName,
  });
}
