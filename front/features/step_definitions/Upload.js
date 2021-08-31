/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

let uploadDay
let uploadMonth
let uploadYear
let nextDay
let nextMonth
let nextYear
let dirigeLength
let titulo
let descripcion
let etiquetaLength
let expected

const checkFunction = () => {
  const uploadDate = new Date(uploadYear, uploadMonth, uploadDay)
  const nextDate = new Date(nextYear, nextMonth, nextDay)
  if ((nextDate.getTime() - uploadDate.getTime()) / 86400000 >= 7) {
    expected = 'acepta'
    return
  }
  expected = 'denega'
}

const checkLength1 = () => {
  if (dirigeLength !== 0) {
    expected = 'acepta'
    return
  }
  expected = 'denega'
}

const checkFilled = () => {
  if (descripcion.length !== 0 && titulo.length !== 0) {
    expected = 'acepta'
    return
  }
  expected = 'denega'
}

const checkTags = () => {
  if (etiquetaLength > 0) {
    expected = 'acepta'
    return
  }
  expected = 'denega'
}

Given('El documento se subió {int} de {int} del {int}', function (day1, month1, year1) {
  uploadDay = day1
  uploadMonth = month1
  uploadYear = year1
})

When('Se ingresa la fecha {int} {int} {int}', function (inDay, inMonth, inYear) {
  nextDay = inDay
  nextMonth = inMonth
  nextYear = inYear
  checkFunction()
})

Then('Se {string} la fecha', function (validez) {
  assert.strictEqual(checkFunction(), validez)
})

Given('Se esta subiendo un recurso', function () {
  console.log('Creando cuenta')
})

When('La longitud de a quién se dirige es {int}', function (length) {
  dirigeLength = length
  checkLength1()
})

When('El {string} y la {string} no estan vacias', function (title, description) {
  titulo = title
  descripcion = description
  checkFilled()
})

When('La longitud de etiquetas es {int}', function (length) {
  etiquetaLength = length
  checkTags()
})

Then('Se {string} la solicitud', function (validez) {
  assert.strictEqual(expected, validez)
})
