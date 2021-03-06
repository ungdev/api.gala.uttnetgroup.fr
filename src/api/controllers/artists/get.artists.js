const errorHandler = require('../../utils/errorHandler')
const isAuth = require('../../middlewares/isAuth')
const isAdmin = require('../../middlewares/isAdmin')

module.exports = app => {
  app.get('/artists', async (req, res) => {
    const { Artist, Link } = app.locals.models
    try {
      const artists = await Artist.findAll({
        include: [Link],
        where: {
          visible: true
        },
        order: [
          ['index', 'ASC']
        ]
      })

      return res
        .status(200)
        .json(artists)
    } catch (err) {
      errorHandler(err, res)
    }
  })

  app.get('/artists/all', [isAuth('artists-get-all'), isAdmin('artists-get-all')])
  app.get('/artists/all', async (req, res) => {
    const { Artist, Link } = app.locals.models
    try {
      const artists = await Artist.findAll({ 
        include: [Link],
        order: [
          ['index', 'ASC']
        ]
      })

      return res
        .status(200)
        .json(artists)
    } catch (err) {
      errorHandler(err, res)
    }
  })
}
