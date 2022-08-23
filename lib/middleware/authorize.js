const Item = require('../models/Item');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    const user = await User.getById(item.user_id);
    if (!req.user || req.user.email !== user.email)
      throw new Error('You do not have access to this page');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
