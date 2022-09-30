import i18next from "i18next";
import { PropsWithChildren } from "react";

type FieldProps = {
  label: string,
}

export default function Field({label, children}: PropsWithChildren<FieldProps>) {
  const i18nLabel = i18next.t(label);

  return (
    <div className='top-div'>
      <label htmlFor={label} className='field-label'>
        <strong>{i18nLabel}</strong>
      </label>

      {children}
    </div>
  );
}