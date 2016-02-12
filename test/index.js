'use strict'

import superapiJsonp from '../lib/index.js'
import test from 'tape'

test('awesome:test', t => {
  const message = 'everything is awesome'
  t.equals(superapiJsonp('awesome'), message, message)
  t.end()
})

