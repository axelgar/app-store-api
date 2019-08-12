'use strict';

const express = require('express');
const Application = require('../models/Application.js');
const router = express.Router();

router.get('/apps', async (req, res, next) => {
  try {
    const listOfApps = await Application.find();
    res.status(200).json({ listOfApps });
  } catch (error) {
    next(error);
  }
});

router.post('/apps/new', async (req, res, next) => {
  try {
    const newApp = req.body;
    const createdApp = await Application.create(newApp);
    res.status(200).json(createdApp);
  } catch (error) {
    next(error);
  }
});

router.put('/apps/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const appUpdated = req.body;
  try {
    const updated = await Application.findByIdAndUpdate(id, appUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/apps/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: 'app deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
