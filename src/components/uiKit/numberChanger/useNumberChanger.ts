import { useEffect, useState } from "react";

export const useNumberChanger = (formRef: any, fieldName: string, initialState: number | undefined) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    formRef.current?.setFieldsValue({
      [fieldName]: state,
    });
  }, [state])

  return {
    state, setState
  }
}