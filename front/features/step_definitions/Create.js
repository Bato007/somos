/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')

Given('Someone interested approaches SOMOS', function () {
  return console.log('Account created')
})

When('The account is created by an Admin with {string} and {string}', function (givenUser, givenPass) {
  this.username = givenUser
  this.password = givenPass
})

Then('{string} {string} can access the resources in an ordered way', function (inUser, inPass) {
  assert.strictEqual(this.username, inUser)
  assert.strictEqual(this.password = inPass)
})
