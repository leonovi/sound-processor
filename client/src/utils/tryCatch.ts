type TrySetFuncT = (
  tryFunction: () => void,
  catchFunction: (error: unknown) => void
) => void;

export const tryCatch: TrySetFuncT = (
  tryFunction,
  catchFunction
) => {
  try {
    tryFunction();
  } catch (error) {
    catchFunction(error);
  }
};
