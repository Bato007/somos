/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let result

const checkValidity = (input) => {
  if (input === 'borran') {
    result = 'buena'
  } else {
    result = 'mala'
  }
}

const checkServer = (input) => {
  if (input === 'avisa') {
    result = 'buena'
  } else {
    result = 'mala'
  }
}

Given('El usuario esta cerrando sesion', function () {
  console.log('Cerrando sesion')
})

When('Acepta cerrar la sesion y se {string} los datos', function (input) {
  checkValidity(input)
})

When('Acepta cerrar la sesion y se {string} al servidor', function (input) {
  checkServer(input)
})

Then('La seguridad es {string}', function (final) {
  assert.strictEqual(result, final)
})
