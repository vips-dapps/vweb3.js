const _ = require('lodash');
const chai = require('chai');

const { assert } = chai;

module.exports = class VAssert {
  static isVIPSTARCOINAddress(address) {
    assert.isDefined(address);
    assert.equal(_.size(address), 34);
    assert.isTrue(address.startsWith('v') || address.startsWith('V'));
  }
};
