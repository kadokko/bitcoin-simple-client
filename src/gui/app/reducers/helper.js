export const updateState = (state, dataOnSuccess, dataOnError, messageOnError, isError) => {
  if (isError) {
    return { ...state,
      ...dataOnError,
      error: { message: messageOnError },
    };
  }
  return { ...state,
    ...dataOnSuccess,
    error: undefined,
  };
};
