var express = require('express');
var router = express.Router();



module.exports = (pg) => {
  router.patch('/:id/description', async (req, res, next) => {
      try {
        await pg.leet(req.params.id);
        res.send('Update sucessfull');
      } catch (e) {
        if (e.code == 0) { //no data
          res.status(404).send('Item to update not found');
        }
        else {
          res.status(500).send('Internall error');
        }
        console.log(e);
      }
    
  });



return router;

};