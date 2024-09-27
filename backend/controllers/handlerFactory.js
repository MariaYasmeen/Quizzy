/* eslint-disable node/no-unsupported-features/es-syntax */
const APIFeatures = require('../Utils/apiFeatures');
const AppError = require('../Utils/appError');
const catchAsync = require('./../Utils/catchAsync');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc)
      return next(
        new AppError('Invalid ID no document found with that Id', 404)
      );
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc)
      return next(
        new AppError('Invalid ID no document found with that Id', 404)
      );
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    if (req.query.createdBy) {
      query = query.where({ createdBy: req.query.createdBy });
    }
    const doc = await query;
    if (!doc) {
      return next(
        new AppError('Invalid ID: no document found with that ID', 404)
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.propertyId) filter = { property: req.params.propertyId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc
      }
    });
  });
