export function createError(errorCode, errorMsg) {
  return { status: errorCode, data: { errorMessage: [errorMsg] } };
}
