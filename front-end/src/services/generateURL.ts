import { CharacterValuesType } from "@/types";

export default function generateURL(formValues: CharacterValuesType) {
  const blob = new Blob([JSON.stringify(formValues)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}
