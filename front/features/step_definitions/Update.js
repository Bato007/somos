/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let result

const checkEmail = (mail) => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}

Given('Un usuario quiere actualizar su cuenta', function () {
  console.log('Un usuario quiere actualizar su cuenta')
})

Given('Un usuario ha actualizado la cuenta', function () {
  console.log('Un administrador recibe solicitud de cambios en cuenta')
})

When('El administrador {string} el cambio', function (solucion) {
  if (solucion === 'acepta') {
    result = 'si'
  } else {
    result = 'no'
  }
})

When('Modifica para tener {int} categorias', function (categories) {
  if (categories <= 0) {
    result = 'no'
  } else {
    result = 'si'
  }
})

When('Ingresa {string} y {string}', function (clave, conf) {
  if (clave === conf) {
    result = 'si'
  } else {
    result = 'no'
  }
})

When('Ingresa su {string}', function (email) {
  if (checkEmail(email)) {
    result = 'si'
  } else {
    result = 'no'
  }
})

When('Ingresa residencia {string}', function (residencia) {
  if (residencia !== '0') {
    result = 'si'
  } else {
    result = 'no'
  }
})

Then('La cuenta {string} es actualizada', function (finalResult) {
  assert.strictEqual(result, finalResult)
})
