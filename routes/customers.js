var express = require('express');
var router = express.Router();

/* GET users listing. */



module.exports = (pg) => {
  router.patch('/:id/assignItem', async (req, res, next) => {
    if (!req.body.itemId) {
      res.status(400).send('itemId not specified');

    } else {
      try {
        await pg.asignItemToCutomer(req.body.itemId, req.params.id);
        res.send('update sucessful');
      } catch (e) {
        res.status(500).send('Error');
      }
    }
  });
  return router;
};