import type { PropsWithChildren } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export default function TestWrapper({ children }: PropsWithChildren) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
}