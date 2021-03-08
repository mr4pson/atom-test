import { useEffect, useState } from "react";

export const useTextRedactor = (formRef: any) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    formRef.current?.setFieldsValue({
      description: state,
    });
  }, [state])

  return {
    state, setState
  }
}