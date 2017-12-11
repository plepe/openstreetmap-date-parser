function parseDate (value) {
  var m

  m = value.match(/^~?(\d{4})$/)
  if (m) {
    return [ parseInt(m[1]), 1 ]
  }

  if (value.match(/^\d{4}-\d{2}(-\d{2})?$/)) {
    return [ parseInt(value), 1 ]
  }

  m = value.match(/^(\d*) BC$/)
  if (m) {
    return [ -parseInt(m[1]) + 1, 1 ]
  }

  m = value.match(/^~?(\d{4})s$/)
  if (m) {
    return [ parseInt(m[1]), 10 ]
  }

  m = value.match(/^~?C(\d{2})$/)
  if (m) {
    return [ (parseInt(m[1]) - 1) * 100, 100 ]
  }
}

/**
 * return the lowest or highest possible year which fits the value
 */
function osmDateParser (value, options) {
  var m, v, g

  m = value.match(/^(.*)\.\.(.*)$/)
  if (m) {
    let s = osmDateParser(m[1])
    let e = osmDateParser(m[2])
    return [ s[0], e[1] ]
  }

  m = value.match(/^(\d*) BCE?$/)
  if (m) {
    [ v, g ] = parseDate(value)
    return [ v, v ]
  }

  m = value.match(/^before (.*)$/)
  if (m) {
    [ v, g ] = parseDate(m[1])
    return [ null, v - 1 ]
  }

  m = value.match(/^after (.*)$/)
  if (m) {
    [ v, g ] = parseDate(m[1])
    return [ v + g, null ]
  }

  m = value.match(/^early (.*)$/)
  if (m) {
    [ v, g ] = parseDate(m[1])
    return [ v, Math.round(v + g * 0.33) ]
  }

  m = value.match(/^mid (.*)$/)
  if (m) {
    [ v, g ] = parseDate(m[1])
    return [ Math.round(v + g * 0.33), Math.round(v + g * 0.67 - 1) ]
  }

  m = value.match(/^late (.*)$/)
  if (m) {
    [ v, g ] = parseDate(m[1])
    return [ Math.round(v + g * 0.67 - 1), v + g - 1 ]
  }

  m = parseDate(value)
  if (m) {
    [ v, g ] = m
    return [ v, v + g - 1 ]
  }
}

module.exports = osmDateParser
