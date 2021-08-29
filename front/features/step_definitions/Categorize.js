/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let validez
let expected

const checkSpecial = (category) => {
  if (/[!"#$%&'()*+,-./:;=?@[\]^_`{|}~]/.test(category)) {
    validez = 'invalida'
    return
  }
  validez = 'valida'
}

const checkLength = (category) => {
  if (category.length < 3) {
    validez = 'invalida'
    return
  }
  validez = 'valida'
}

const categoryLength = (length) => {
  if (length !== 0) {
    expected = 'aceptada'
    return
  }
  expected = 'denegada'
}

Given('Se esta categorizando al usuario', function () {
  console.log('Categorizando usuario')
})

When('Se selecciona la categoria {string}', function (category) {
  checkSpecial(category)
})

When('Se crea la categoria {string}', function (category) {
  checkLength(category)
})

Then('La categoria es {string}', function (inValidez) {
  assert.strictEqual(validez, inValidez)
})

When('La longitud de categorias del usuario es {int}', function (length) {
  categoryLength(length)
})

Then('La solicitud es {string}', function (inExpected) {
  assert.strictEqual(expected, inExpected)
})
