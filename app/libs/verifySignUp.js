const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.email = data.email.replace(/\s/g, '');
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = "L'adresse email est invalide";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Veillez inserer une adresse email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Veillez inserer votre mot de passe';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Veillez inserer votre mot de passe de confirmation';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Ce mot de passe est incorrect';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
