"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

// statistics utilities
const { findMean, findMedian, findMode } = require("./stats");

// utility for converting array of stringified numbers
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";




/** Finds mean of nums in qs: returns {operation: "mean", result }
 *  User must submit nums as a string of numbers separated by only commas!
 *  Return BadRequestError otherwise.
*/
app.get("/mean", function(req, res) {

  // debugger;
  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');

  const nums = convertStrNums(strNums);

  const result = findMean(nums);

  return res.json({
    operation: "mean",
    value: result
  });
});



/** Finds median of nums in qs: returns {operation: "median", result }
 *  User must submit nums as a string of numbers separated by only commas!
 *  Return BadRequestError otherwise.
 */
app.get("/median", function(req, res) {

  // debugger;
  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');

  const nums = convertStrNums(strNums);

  const result = findMedian(nums);

  return res.json({
    operation: "median",
    value: result
  });
});


/** Finds mode of nums in qs: returns {operation: "mean", result }
 *  User must submit nums as a string of numbers separated by only commas!
 *  Return BadRequestError otherwise.
*/
app.get("/mode", function(req, res) {

  // debugger;
  if(!req.query.nums) {
    throw new BadRequestError(MISSING);
  }

  const strNums = req.query.nums.split(',');

  const nums = convertStrNums(strNums);

  const result = findMode(nums);

  return res.json({
    operation: "mode",
    value: result
  });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;
