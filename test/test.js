var expect = require('chai').expect;
var addTwoNumbers = require('../addTwoNumbers');
var existingUser = require('../checkExistingUser');

describe('addTwoNumbers()', function () {
  it('should add two numbers', function () {

    // 1. ARRANGE
    var x = 5;
    var y = 1;
    var sum1 = 6;

    // 2. ACT
    var sum2 = addTwoNumbers(x, y);

    // 3. ASSERT
    expect(sum2).to.be.equal(sum1);

  });
});

describe('checkExistingUser()', function () {
  it('should validate existing users', function () {
    var good = existingUser();

    expect(good).to.be.true;
  });
});