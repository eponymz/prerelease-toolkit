require('chai').should()
var expect = require('chai').expect
var assert = require('chai').assert
var addTwoNumbers = require('./addTwoNumbers')
const express = require('express')
var request = require('supertest')

describe('addTwoNumbers()', function () {
  it('should add two numbers', function () {
    // 1. ARRANGE
    var x = 5
    var y = 1
    var sum1 = 6

    // 2. ACT
    var sum2 = addTwoNumbers(x, y)

    // 3. ASSERT
    expect(sum2).to.be.equal(sum1)
  })
})

describe('without NODE_ENV', function () {
  it('should default to development', function () {
    process.env.NODE_ENV = ''
    var app = express()
    app.get('env').should.equal('development')
    process.env.NODE_ENV = 'test'
  })
})

describe('User schema exists', function () {
  it('should definitely exist', function () {
    var userSchema = '../models/schemas.userSchema'
    assert.isDefined(userSchema, 'Schema exists')
  })
})

describe('Dictionary schema exists', function () {
  it('should definitely exist', function () {
    var dictSchema = '../models/schemas.dictSchema'
    assert.isDefined(dictSchema, 'Schema exists')
  })
})

describe('GET /current_user', function () {
  it('responds with status 404 if no auth', function () {
    var app = express()
    request(app)
      .get('/api/current_user')
      .expect(404)
      .end(function (err) {
        if (err) throw err
      })
  })
})

describe('app.route', function () {
  it('should return a new route', function (done) {
    var app = express()

    app
      .route('/foo')
      .get(function (req, res) {
        res.send('get')
      })
      .post(function (req, res) {
        res.send('post')
      })

    request(app)
      .post('/foo')
      .expect('post', done)
  })

  it('should all .VERB after .all', function (done) {
    var app = express()

    app
      .route('/foo')
      .all(function (req, res, next) {
        next()
      })
      .get(function (req, res) {
        res.send('get')
      })
      .post(function (req, res) {
        res.send('post')
      })

    request(app)
      .post('/foo')
      .expect('post', done)
  })

  it('should support dynamic routes', function (done) {
    var app = express()

    app.route('/:foo').get(function (req, res) {
      res.send(req.params.foo)
    })

    request(app)
      .get('/test')
      .expect('test', done)
  })

  it('should not error on empty routes', function (done) {
    var app = express()

    app.route('/:foo')

    request(app)
      .get('/test')
      .expect(404, done)
  })
})

describe('app', function () {
  describe('.request', function () {
    it('should extend the request prototype', function (done) {
      var app = express()

      app.request.querystring = function () {
        return require('url').parse(this.url).query
      }

      app.use(function (req, res) {
        res.end(req.querystring())
      })

      request(app)
        .get('/foo?name=tobi')
        .expect('name=tobi', done)
    })
  })
})

describe('config', function () {
  describe('.set()', function () {
    it('should set a value', function () {
      var app = express()
      app.set('foo', 'bar')
      assert.equal(app.get('foo'), 'bar')
    })

    it('should return the app', function () {
      var app = express()
      assert.equal(app.set('foo', 'bar'), app)
    })

    it('should return the app when undefined', function () {
      var app = express()
      assert.equal(app.set('foo', undefined), app)
    })

    describe('"etag"', function () {
      it('should throw on bad value', function () {
        var app = express()
        assert.throws(app.set.bind(app, 'etag', 42), /unknown value/)
      })

      it('should set "etag fn"', function () {
        var app = express()
        var fn = function () {}
        app.set('etag', fn)
        assert.equal(app.get('etag fn'), fn)
      })
    })

    describe('"trust proxy"', function () {
      it('should set "trust proxy fn"', function () {
        var app = express()
        var fn = function () {}
        app.set('trust proxy', fn)
        assert.equal(app.get('trust proxy fn'), fn)
      })
    })
  })

  describe('.get()', function () {
    it('should return undefined when unset', function () {
      var app = express()
      assert.strictEqual(app.get('foo'), undefined)
    })

    it('should otherwise return the value', function () {
      var app = express()
      app.set('foo', 'bar')
      assert.equal(app.get('foo'), 'bar')
    })

    describe('when mounted', function () {
      it('should default to the parent app', function () {
        var app = express()
        var blog = express()

        app.set('title', 'Express')
        app.use(blog)
        assert.equal(blog.get('title'), 'Express')
      })

      it('should given precedence to the child', function () {
        var app = express()
        var blog = express()

        app.use(blog)
        app.set('title', 'Express')
        blog.set('title', 'Some Blog')

        assert.equal(blog.get('title'), 'Some Blog')
      })

      it('should inherit "trust proxy" setting', function () {
        var app = express()
        var blog = express()

        function fn () {
          return false
        }

        app.set('trust proxy', fn)
        assert.equal(app.get('trust proxy'), fn)
        assert.equal(app.get('trust proxy fn'), fn)

        app.use(blog)

        assert.equal(blog.get('trust proxy'), fn)
        assert.equal(blog.get('trust proxy fn'), fn)
      })

      it('should prefer child "trust proxy" setting', function () {
        var app = express()
        var blog = express()

        function fn1 () {
          return false
        }
        function fn2 () {
          return true
        }

        app.set('trust proxy', fn1)
        assert.equal(app.get('trust proxy'), fn1)
        assert.equal(app.get('trust proxy fn'), fn1)

        blog.set('trust proxy', fn2)
        assert.equal(blog.get('trust proxy'), fn2)
        assert.equal(blog.get('trust proxy fn'), fn2)

        app.use(blog)

        assert.equal(app.get('trust proxy'), fn1)
        assert.equal(app.get('trust proxy fn'), fn1)
        assert.equal(blog.get('trust proxy'), fn2)
        assert.equal(blog.get('trust proxy fn'), fn2)
      })
    })
  })

  describe('.enable()', function () {
    it('should set the value to true', function () {
      var app = express()
      assert.equal(app.enable('tobi'), app)
      assert.strictEqual(app.get('tobi'), true)
    })
  })

  describe('.disable()', function () {
    it('should set the value to false', function () {
      var app = express()
      assert.equal(app.disable('tobi'), app)
      assert.strictEqual(app.get('tobi'), false)
    })
  })

  describe('.enabled()', function () {
    it('should default to false', function () {
      var app = express()
      assert.strictEqual(app.enabled('foo'), false)
    })

    it('should return true when set', function () {
      var app = express()
      app.set('foo', 'bar')
      assert.strictEqual(app.enabled('foo'), true)
    })
  })

  describe('.disabled()', function () {
    it('should default to true', function () {
      var app = express()
      assert.strictEqual(app.disabled('foo'), true)
    })

    it('should return false when set', function () {
      var app = express()
      app.set('foo', 'bar')
      assert.strictEqual(app.disabled('foo'), false)
    })
  })
})

describe('middleware', function () {
  describe('.next()', function () {
    it('should behave like connect', function (done) {
      var app = express()

      var calls = []

      app.use(function (req, res, next) {
        calls.push('one')
        next()
      })

      app.use(function (req, res, next) {
        calls.push('two')
        next()
      })

      app.use(function (req, res) {
        var buf = ''
        res.setHeader('Content-Type', 'application/json')
        req.setEncoding('utf8')
        req.on('data', function (chunk) {
          buf += chunk
        })
        req.on('end', function () {
          res.end(buf)
        })
      })

      request(app)
        .get('/')
        .set('Content-Type', 'application/json')
        .send('{"foo":"bar"}')
        .expect('Content-Type', 'application/json')
        .expect(200, '{"foo":"bar"}', done)
    })
  })
})

describe('exports', function () {
  it('should permit modifying the .application prototype', function () {
    express.application.foo = function () {
      return 'bar'
    }
    express()
      .foo()
      .should.equal('bar')
  })

  it('should permit modifying the .request prototype', function (done) {
    express.request.foo = function () {
      return 'bar'
    }
    var app = express()

    app.use(function (req, res) {
      res.end(req.foo())
    })

    request(app)
      .get('/')
      .expect('bar', done)
  })

  it('should permit modifying the .response prototype', function (done) {
    express.response.foo = function () {
      this.send('bar')
    }
    var app = express()

    app.use(function (req, res) {
      res.foo()
    })

    request(app)
      .get('/')
      .expect('bar', done)
  })

  it('should throw on old middlewares', function () {
    var error
    try {
      // noinspection BadExpressionStatementJS
      express.bodyParser
    } catch (e) {
      error = e
    }
    error.should.have.property('message')
    error.message.should.contain('middleware')
    error.message.should.contain('bodyParser')
  })
})
