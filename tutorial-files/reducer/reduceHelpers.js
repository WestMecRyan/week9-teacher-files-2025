const { readFile } = require("./fileHelpers.js");

function findHighestPriced(filePath) {
  const data = readFile(filePath);
  const highestPriced = data.reduce((highest, current) => {
    return current.price > highest.price ? current : highest;
  });
  return highestPriced;
}

module.exports = { findHighestPriced };
