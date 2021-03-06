// Models
const { Order } = require('../models/order.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id, status: 'active' } });

  if (!order) {
    return next(new AppError('This order is not active', 400));
  }

  req.order = order;
  next();
});

module.exports = { orderExist };
