const supertest = require('supertest')
const functionsTest = require('firebase-functions-test')()
const admin = require('firebase-admin')

let undertest, request

describe('TEST ENV', () => {
  beforeEach(() => {
    jest.spyOn(admin, 'initializeApp')
    undertest = require('../src/server')
    request = supertest(undertest.api)
  })

  afterEach(() => {
    functionsTest.cleanup()
  })

  it('get app !', async () => {
    const actual = await request.get('/')
    const { ok, status, body } = actual
    expect(ok).toBe(true)
    expect(status).toBeGreaterThanOrEqual(200)
    expect(body).toBeDefined()
  })
})
