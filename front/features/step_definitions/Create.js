/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let validacion
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

Given('Se esta creando una cuenta', function () {
  console.log('Cuenta creada')
})

When('Se ingresa la clave {string}', function (clave) {
  validacion = validarClave(clave)
})

Then('Se {string}  las condiciones', function (resultado) {
  assert.strictEqual(validacion, resultado)
})
