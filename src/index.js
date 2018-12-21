function MyArray(...args) {
  if (arguments.length === 1) {
    for (let i = 0; i < args[0]; i++) {
      this[i] = undefined;
    }
    this.length = args[0];
  } else {
    for (let i = 0; i < arguments.length; i++) {
      this[i] = args[i];
    }
    this.length = arguments.length;
  }
}

MyArray.prototype.push = function(element) {
  this[this.length] = element;
  this.length += 1;
  return this;
};

MyArray.prototype.pop = function() {
  const lastItem = this[this.length - 1];
  this.length -= 1;
  delete this[this.length];
  return lastItem;
};

MyArray.prototype.toString = function() {
  let resultStr = '[ ';

  for (let i = 0; i < this.length; i++) {
    resultStr += `${this[i]} `;
  }
  resultStr += ']';

  return resultStr;
};

MyArray.prototype.map = function(cb) {
  const resultArr = new MyArray(0);

  for (let i = 0; i < this.length; i++) {
    const newElement = cb(this[i], i, this);
    resultArr.push(newElement);
  }

  return resultArr;
};

MyArray.prototype.filter = function(cb) {
  const resultArr = new MyArray(0);

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      resultArr.push(this[i]);
    }
  }

  return resultArr;
};

MyArray.prototype.forEach = function(cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

MyArray.prototype.reduce = function(cb, initValue) {
  let accumulator = null;

  if (initValue === undefined) {
    accumulator = this[0];
  } else {
    accumulator = cb(initValue, this[0], 0, this);
  }

  for (let i = 1; i < this.length; i++) {
    accumulator = cb(accumulator, this[i], i, this);
  }

  return accumulator;
};

MyArray.from = function(source) {
  const resultArr = new MyArray(0);

  for (let i = 0; i < source.length; i++) {
    resultArr.push(source[i]);
  }

  return resultArr;
};

MyArray.prototype.sort = function(cb) {
  let callback = cb;

  if (!callback) {
    callback = function(a, b) {
      let firstArg = a;
      let secondArg = b;
      firstArg = firstArg.toString();
      secondArg = secondArg.toString();

      if (firstArg > secondArg) {
        return 1;
      } else if (secondArg > firstArg) {
        return -1;
      } else {
        return 0;
      }
    };
  }

  let insertedItem = null;
  let j = 0;

  for (let i = 0; i < this.length; i++) {
    insertedItem = this[i];
    j = i - 1;

    while (j >= 0 && cb(this[j], insertedItem) > 0) {
      this[j + 1] = this[j];
      j -= 1;
    }
    this[j + 1] = insertedItem;
  }

  return this;
};

MyArray.prototype[Symbol.iterator] = function() {
  let index = 0;
  const that = this;

  return {
    next() {
      if (index < that.length) {
        index += 1;
        return {
          value: that[index - 1],
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
};


export default MyArray;