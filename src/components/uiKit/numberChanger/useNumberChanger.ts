import { useEffect, useState } from "react";

export const useNumberChanger = (form: any, fieldName: string, initialState: number | undefined) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    form.setFieldsValue({
      [fieldName]: state,
    });
  }, [state])

  return {
    state, setState
  }
}