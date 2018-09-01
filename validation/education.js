const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldOfstudy = !isEmpty(data.fieldOfstudy) ? data.fieldOfstudy : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Job school field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Job degree field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Job from date field is required";
  }
  if (Validator.isEmpty(data.fieldOfstudy)) {
    errors.fieldOfstudy = "fieldOfstudy field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
