/* global describe, it */
var assert = require('assert')
var osmDateParser = require('../src/parser.js')

describe('osmDateParser', function () {
  it('simple values', function () {
    assert.deepEqual([ 1984, 1984 ], osmDateParser('1984'))
  })

  it('inexact values', function () {
    assert.deepEqual([ 1984, 1984 ], osmDateParser('~1984'))
  })

  it('more exact dates', function () {
    assert.deepEqual([ 1984, 1984 ], osmDateParser('1984-10-20'))
    assert.deepEqual([ 1984, 1984 ], osmDateParser('1984-10'))
  })

  it('decades', function () {
    assert.deepEqual([ 1980, 1989 ], osmDateParser('1980s'))
  })

  it('centuries', function () {
    assert.deepEqual([ 1900, 1999 ], osmDateParser('C20'))
  })

  it('before/after', function () {
    assert.deepEqual([ null, 1854 ], osmDateParser('before 1855'))
    assert.deepEqual([ null, 1299 ], osmDateParser('before C14'))
    assert.deepEqual([ null, 1979 ], osmDateParser('before 1980s'))
    assert.deepEqual([ 1856, null ], osmDateParser('after 1855'))
    assert.deepEqual([ 1990, null ], osmDateParser('after 1980s'))
    assert.deepEqual([ 1400, null ], osmDateParser('after C14'))
  })

  it('early/mid/late', function () {
    assert.deepEqual([ 1855, 1855 ], osmDateParser('early 1855'))
    assert.deepEqual([ 1855, 1855 ], osmDateParser('mid 1855'))
    assert.deepEqual([ 1855, 1855 ], osmDateParser('late 1855'))

    assert.deepEqual([ 1920, 1923 ], osmDateParser('early 1920s'))
    assert.deepEqual([ 1923, 1926 ], osmDateParser('mid 1920s'))
    assert.deepEqual([ 1926, 1929 ], osmDateParser('late 1920s'))

    assert.deepEqual([ 1300, 1333 ], osmDateParser('early C14'))
    assert.deepEqual([ 1333, 1366 ], osmDateParser('mid C14'))
    assert.deepEqual([ 1366, 1399 ], osmDateParser('late C14'))
  })

  it('BC dates', function () {
    assert.deepEqual([ 0, 0 ], osmDateParser('1 BC'))
    assert.deepEqual([ -449, -449 ], osmDateParser('450 BC'))
  })

  it('ranges', function () {
    assert.deepEqual([ 1914, 1918 ], osmDateParser('1914..1918'))
    assert.deepEqual([ 2008, 2008 ], osmDateParser('2008-08-08..2008-08-24'))
    assert.deepEqual([ 1920, 1946 ], osmDateParser('early 1920s..mid 1940s'))
  })

  it('errors', function () {
    assert.deepEqual(null, osmDateParser('1990-2000'))
    assert.deepEqual(null, osmDateParser('1990-2000'))
  })
})
