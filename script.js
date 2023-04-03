//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = this.constructor.name;
  }
}

function evalString(expression) {
  try {
    if (/^\s*[+/*]/.test(expression)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }
    if (/[-+/*]\s*$/.test(expression)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }
    if (/[*+\/][-+*/]/.test(expression)) {
      throw new InvalidExprError();
    }
    const result = eval(expression);
    if (!Number.isInteger(result)) {
      throw new OutOfRangeError('result');
    }
    return result;
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof InvalidExprError) {
      throw error;
    } else if (error instanceof OutOfRangeError) {
      console.error(error);
      return null;
    } else {
      console.error('Unexpected error:', error);
      return null;
    }
  }
}
