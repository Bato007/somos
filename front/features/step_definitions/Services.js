/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')
const { time } = require('console')

let email
let phone
let restricted
let result1
let result2
let hour1
let minute1
let day1

const checkMail = (mail) => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    result1 = 'aceptado'
    return
  }
  result1 = 'denegado'
}

const checkField = (amount) => {
  if (amount === 5) {
    result2 = 'enviada'
    return
  }
  result2 = 'rechazada'
}

const checkTimeDiff = (day, hour, min) => {
  const date1 = new Date(2021, 9, day1, hour1, minute1)
  const date2 = new Date(2021, 9, day, hour, min)
  const timeDiff = Math.abs((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
  if (timeDiff >= 1) {
    result2 = 'enviada'
    return
  }
  result2 = 'rechazada'
}

Given('El usuario no este en la lista negra {string} y {int}', function (mail, num) {
  email = mail
  phone = num
})

When('El usuario le da submit', function () {
  if (email !== '' && phone !== 0) {
    console.log(email, 'cumple ambos')
    restricted = 'restringido'
  } else if (email !== '' && phone === 0) {
    console.log(email, 'cumple email')
    restricted = 'restringido'
  } else if (email === '' && phone !== 0) {
    console.log(phone, 'cumple telefono')
    restricted = 'restringido'
  } else {
    console.log('No cumple')
    restricted = 'irrestricto'
  }
})

Then('Debe ser tratado por medio del {string}', function (validacion) {
  assert.strictEqual(restricted, validacion)
})

Given('Se crea la cuenta de un brindador de servicios', function () {
  console.log('Creando cuenta')
})

When('Se asigna el correo {string}', function (inCorreo) {
  checkMail(inCorreo)
})

Then('El correo fue {string}', function (validez) {
  assert.strictEqual(result1, validez)
})

Given('Hay cinco campos en el formulario', function () {
  console.log('Revisando campos')
})

When('Se completan {int} campos', function (fieldFill) {
  checkField(fieldFill)
})

Given('La ultima solicitud fue {int} {int} {int}', function (day, hour, minute) {
  day1 = day
  hour1 = hour
  minute1 = minute
})

When('Se envia la solicitud a las {int} {int} del {int}', function (hour, minute, day) {
  checkTimeDiff(day, hour, minute)
})

Then('La solicitud fue {string}', function (input) {
  assert.strictEqual(result2, input)
})
