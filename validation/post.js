const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "post must be atleast 10 and max 300 characte long";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post field is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
