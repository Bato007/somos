const lookup = require('country-code-lookup')

const valEmail = (email) => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  return false
}

const valPassword = (password) => {
  const largo = password.length
  if (largo < 8 || largo > 16) {
    return false
  } if (!/[a-z]/.test(password)) {
    return false
  } if (!/[A-Z]/.test(password)) {
    return false
  } if (!/[0-9]/.test(password)) {
    return false
  } if (!/[!"#$%&'()*+,-./:;=?@[\]^_`{|}~]/.test(password)) {
    return false
  }
  return true
}

const valRegion = (region) => {
  const place = region ? region.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase()) : region
  if (lookup.byCountry(place)) {
    return place
  }
  return undefined
}

module.exports = {
  valEmail,
  valPassword,
  valRegion,
}
