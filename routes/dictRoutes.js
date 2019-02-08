const bodyParser = require('body-parser')
const dictionaryController = require('../controllers/dictionaryController')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.get('/api/dict/search', dictionaryController.searchByTerm)
  app.get('/api/dict/alpha-search', dictionaryController.searchByLetter)
  app.post('/api/dict/create', dictionaryController.createTerm)
  app.delete('/api/dict/delete', dictionaryController.deleteTerm)
}
