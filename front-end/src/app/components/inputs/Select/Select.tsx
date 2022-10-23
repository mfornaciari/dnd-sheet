import type { UseFormRegister } from "react-hook-form";
import type { Option } from "@/types";
import i18next from "i18next";
import { Container } from "@/app/components";

type SelectProps = Readonly<{
  name: string;
  invalid: boolean;
  optionData: Option[];
  register: UseFormRegister<any>;
  required?: boolean;
}>;

export function Select({
  name,
  invalid,
  optionData,
  register,
  required
}: SelectProps) {
  const i18nName = i18next.t(name);

  const labelElement = (
    <label htmlFor={name} className="title">
      <strong>{i18nName}</strong>
    </label>
  );

  const optionElements = optionData.map(({ name, id }) => {
    const i18nOptionName = i18next.t(name);

    return (
      <option key={id} value={id}>
        {i18nOptionName}
      </option>
    );
  });

  return (
    <Container
      title={labelElement}
      invalid={invalid}
    >
      <select
        id={name}
        className="input"
        {...register(name, { required: required })}
      >
        {optionElements}
      </select>
    </Container>
  );
}
