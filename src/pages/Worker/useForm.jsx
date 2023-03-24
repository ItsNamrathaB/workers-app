import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.name]: e.value,
      });
    },
  ];
}

export default useForm;
