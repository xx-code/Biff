const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.email = data.email.replace(/\s/g, '');
  data.password = !isEmpty(data.password) ? data.password : '';


  if (!Validator.isEmail(data.email)) {
    errors.email = "L'adresse email est invalide";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Veillez inserer une adresse email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Veillez inserer votre mot de passe';
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
