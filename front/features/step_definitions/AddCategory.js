/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let expected
const categories = ['one', 'two', 'three', 'four']

const addCategory = (category) => {
  if (/[!"#$%&'()*+,-./:;=?@[\]^_`{|}~]/.test(category) || /[0-9]/.test(category)) {
    expected = 'denegada'
    return
  }
  expected = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
}

const checkCategory = (category) => {
  if (categories.includes(category)) {
    expected = 'null'
    return
  }
  expected = 'once'
}

Given('El usuario de somos esta agregando una categoria', function () {
  console.log('Agregando categoria')
})

When('Ingresa la categoria {string}', function (category) {
  addCategory(category)
})

When('Quiere ingresar la categoria {string}', function (category) {
  checkCategory(category)
})

Then('La categoria final fue {string}', function (result) {
  assert.strictEqual(expected, result)
})

Then('La categoria se agrega {string}', function (result) {
  assert.strictEqual(expected, result)
})
