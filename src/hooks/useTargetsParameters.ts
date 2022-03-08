import { useEffect, useState } from "react";

const useTargetsParameters = (targets: any, setValue: any, setMinValue: any, setMaxValue: any) => {
  const [isParametersInitialize, setParametersInitialize] = useState(false);
  useEffect(() => {
    if (isParametersInitialize) {
      return;
    }

    targets.forEach((value: any, key: string) => {
      const parameters = value.data.parameters;

      Object.keys(parameters).forEach((parameterName) => {
        if (key.includes(parameterName)) {
          const { defaultValue, minValue, maxValue } =
            parameters[parameterName];

          setValue(defaultValue);
          setMinValue(minValue);
          setMaxValue(maxValue);

          setParametersInitialize(true);
        }
      });
    });
  }, [targets]);
};

export { useTargetsParameters };
