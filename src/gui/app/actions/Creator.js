export const createAction = (type, payload = {}, meta = {}) => ({
  type,
  payload,
  error: false,
  meta,
});

export const createErrorAction = (type, error, meta = {}) => {
  const { code, message } = error;
  return {
    type,
    payload: { code, message },
    error: true,
    meta,
  };
};
