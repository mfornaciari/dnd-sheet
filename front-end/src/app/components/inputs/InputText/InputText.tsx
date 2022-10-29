import type { UseFormRegister } from "react-hook-form";
import i18next from "i18next";
import { ContainerLabeled } from "@/app/components";

type InputTextProps = Readonly<{
  name: string;
  invalid: boolean;
  placeholderText?: string;
  register: UseFormRegister<any>;
  required?: boolean;
}>;

export function InputText({
  name,
  invalid,
  placeholderText,
  register,
  required
}: InputTextProps) {
  const i18nName = i18next.t(name);

  return (
    <ContainerLabeled
      label={i18nName}
      labelFor={name}
      invalid={invalid}
    >
      <input
        type="text"
        id={name}
        placeholder={placeholderText}
        className="input"
        {...register(name, { required: required })}
      />
    </ContainerLabeled>
  );
}
