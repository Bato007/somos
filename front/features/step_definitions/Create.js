/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let validacion
let fields
let required
let email

function validarClave(prueba) {
  const largo = prueba.length
  if (largo < 8 || largo > 16) {
    return 'quiebran'
  } if (!/[a-z]/.test(prueba)) {
    return 'quiebran'
  } if (!/[A-Z]/.test(prueba)) {
    return 'quiebran'
  } if (!/[0-9]/.test(prueba)) {
    return 'quiebran'
  } if (!/[!"#$%&'()*+,-./:;=?@[\]^_`{|}~]/.test(prueba)) {
    return 'quiebran'
  }
  return 'cumplen'
}

function checkRequired(filled, necessary) {
  if (filled >= 7 && necessary >= 7) {
    return 'acepta'
  }
  return 'declina'
}

function emailRequirements(inemail) {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(inemail)) {
    return ('acepta')
  }
  return ('denega')
}

Given('Se esta creando la cuenta', function () {
  console.log('Cuenta creada')
})

When('Se ingresa la clave {string}', function (clave) {
  validacion = validarClave(clave)
})

Then('Se {string}  las condiciones', function (resultado) {
  assert.strictEqual(validacion, resultado)
})

When('Se llenan {int} campos', function (fieldFill) {
  fields = fieldFill
})

When('{int} se llenan', function (necessary) {
  required = checkRequired(fields, necessary)
})

Then('Se {string} la cuenta', function (result) {
  assert.strictEqual(required, result)
})

When('Se ingresa el correo {string}', function (inputEmail) {
  email = emailRequirements(inputEmail)
})

Then('El correo es {string}', function (emailResult) {
  assert.strictEqual(email, emailResult)
})
