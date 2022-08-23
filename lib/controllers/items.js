const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {

    try {
      const item = { ...req.body, user_id: req.user.id };
      const data = await Item.insert(item);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  )
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.getAll(req.user.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const data = await Item.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
// TO DO - implement items CRUD
