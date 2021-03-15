import { useEffect, useState } from "react";

export const useTextRedactor = (formRef: any, initialValue: string) => {
  const [state, setState] = useState<string>(initialValue);

  useEffect(() => {
    formRef.current?.setFieldsValue({
      description: state,
    });
  }, [state])

  return {
    state, setState
  }
}