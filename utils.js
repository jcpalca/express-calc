"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  let outputNums = [];

  for(let strNum of strNums) {

    let num = parseFloat(strNum);

    if(Number.isNaN(num)) {
      throw new BadRequestError(`${strNum} is not a number`);
    }

    outputNums.push(num);
  }

  return outputNums;
}


module.exports = { convertStrNums };
