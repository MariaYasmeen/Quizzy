/* eslint-disable node/no-unsupported-features/es-syntax */
import APIFeatures from '../Utils/apiFeatures.js';
import AppError from '../Utils/appError.js';
import catchAsync from './../Utils/catchAsync.js';

export function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
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
}

export function updateOne(Model) {
  return catchAsync(async (req, res, next) => {
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
}
export function getOne(Model, popOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    if (req.query.createdBy) {
      query = query.where({ createdBy: req.query.createdBy });
    }
    if (req.query.isPublic) {
      query = query.where({ isPublic: req.query.isPublic });
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
}

export function createOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
}

export function getAll(Model) {
  return catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.query.participants) {
      filter = {
        participants: {
          $in: [req.query.participants]
        }
      };
    }
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
}
