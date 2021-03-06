// -*- mode: js2 -*-
// -*- coding: utf-8 -*-

jest.unmock('./../core')
jest.unmock('./../qq')

import qq from './../qq'

describe('random/qq', () => {
  it('basic qq', () => {
    expect(
      String(qq()).length
    ).toBe(9)
  })

  it('any length qq number', () => {
    expect(
      String(qq(10)).length
    ).toBe(10)
  })
})
