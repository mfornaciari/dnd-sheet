import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CharacterClassName, FetchedData } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { calculateLevel, generateURL } from "./helpers/useCharacterFormHelpers";

type UseCharacterFormReturn = {
  characterName: string;
  currentLevel: number;
  downloadURL: string;
  errors: FieldErrors;
  handleFileChange: (file: File) => void;
  isValid: boolean;
  register: UseFormRegister<any>;
  selectedClassName: CharacterClassName;
};

const emptyValues = JSON.stringify({
  name: "",
  race: "",
  characterClass: "",
  experience: "0",
});

export function useCharacterForm(data: FetchedData): UseCharacterFormReturn {
  const {
    formState: { errors, isValid },
    getValues,
    register,
    reset,
    watch,
  } = useForm({
    mode: "onTouched",
    defaultValues: JSON.parse(localStorage.getItem("characterValues") ?? emptyValues),
  });

  const characterValues = watch();

  useEffect(() => {
    localStorage.setItem("characterValues", JSON.stringify(characterValues));
  }, [characterValues]);

  const { levels } = data;
  const characterName = watch("name");
  const selectedClassName = watch("characterClass");
  const characterExperience = parseInt(watch("experience"));
  const currentLevel = calculateLevel(levels, characterExperience);
  const downloadURL = generateURL(getValues());

  function handleFileChange(file: File): void {
    const reader = new FileReader();
    reader.onload = event => {
      const stringValues = event.target?.result;
      if (typeof stringValues === "string") {
        const jsonValues = JSON.parse(stringValues);
        reset(jsonValues);
      }
    };
    reader.readAsText(file);
  }

  return {
    characterName,
    currentLevel,
    downloadURL,
    errors,
    handleFileChange,
    isValid,
    register,
    selectedClassName,
  };
}
