const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {

    try {
      console.log(req.user);
      console.log(req.body);
      const item = { ...req.body, user_id: req.user.id };
      console.log(item);
      const data = await Item.insert(item);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  );
// TO DO - implement items CRUD
