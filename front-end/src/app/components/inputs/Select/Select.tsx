import type { UseFormRegister } from "react-hook-form";
import type { Option } from "@/types";
import i18next from "i18next";
import { ContainerLabeled } from "@/app/components";

type SelectProps = Readonly<{
  name: string;
  invalid: boolean;
  optionData: Option[];
  register: UseFormRegister<any>;
  required?: boolean;
}>;

export function Select({ name, invalid, optionData, register, required }: SelectProps) {
  const i18nName = i18next.t(name);

  const optionElements = optionData.map(value => {
    const i18nOptionName = i18next.t(value);

    return (
      <option key={value} value={value}>
        {i18nOptionName}
      </option>
    );
  });

  return (
    <ContainerLabeled label={i18nName} labelFor={name} invalid={invalid}>
      <select id={name} className="input" {...register(name, { required: required })}>
        {optionElements}
      </select>
    </ContainerLabeled>
  );
}
