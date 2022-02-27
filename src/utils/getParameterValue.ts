const getParameterValue = (
  parameter: string,
  parameters: Record<string, Float32Array>
): any => {
  return parameters[parameter][0];
};

export { getParameterValue };
