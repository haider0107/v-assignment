export const zodErrorHandler = (result) => {
  const errors = result.error.flatten();

  let fieldErrorsCombined = "";
  for (const key in errors.fieldErrors) {
    const errorMessages = errors.fieldErrors[key];
    if (errorMessages) {
      if (errorMessages.length > 1) {
        fieldErrorsCombined += errorMessages.join(", ");
      } else {
        fieldErrorsCombined.length
          ? (fieldErrorsCombined += ", " + errorMessages.join(", "))
          : (fieldErrorsCombined += errorMessages.join(", "));
      }
    }
  }

  return fieldErrorsCombined;
};
