function MyArray(...args) {
  if (arguments.length === 1 && typeof args[0] === 'number') {
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

MyArray.prototype.push = function(...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
    this.length += 1;
  }
  return this.length;
};

MyArray.prototype.pop = function() {
  if (this.length === 0) {
    return undefined;
  }

  const lastItem = this[this.length - 1];
  this.length -= 1;
  delete this[this.length];
  return lastItem;
};

MyArray.prototype.toString = function() {
  let resultStr = '';

  if (this.length > 0) {
    for (let i = 0; i < this.length - 1; i++) {
      resultStr += `${this[i]},`;
    }
    resultStr += `${this[this.length - 1]}`;
  }

  return resultStr;
};

MyArray.prototype.map = function(cb, context) {
  const resultArr = new MyArray(0);

  for (let i = 0; i < this.length; i++) {
    const newElement = cb.call(context, this[i], i, this);
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

MyArray.prototype.forEach = function(cb, context) {
  for (let i = 0; i < this.length; i++) {
    cb.call(context, this[i], i, this);
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

MyArray.from = function(source, cb, context) {
  const resultArr = new MyArray(0);

  for (let i = 0; i < source.length; i++) {
    let newElem = null;

    if (cb === undefined && context === undefined) {
      newElem = source[i];
    } else if (context === undefined) {
      newElem = cb(source[i], i, this);
    } else {
      newElem = cb.call(context, source[i], i, this);
    }

    resultArr.push(newElem);
  }

  return resultArr;
};

MyArray.prototype.sort = function(cb) {
  let callback = cb;

  if (!callback) {
    callback = function(a, b) {
      let firstArg = a;
      let secondArg = b;
      firstArg = `${firstArg}`;
      secondArg = `${secondArg}`;

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

    while (j >= 0 && callback(this[j], insertedItem) > 0) {
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

MyArray.prototype.filter = function(cb, context) {
  const cont = context === undefined ? this : context;
  const resultArr = new MyArray();

  for (let i = 0; i < this.length; i++) {
    if (cb.call(cont, this[i], i, this) === true) {
      resultArr.push(this[i]);
    }
  }

  return resultArr;
};

MyArray.prototype.find = function(cb, thisArg) {
  const context = thisArg === undefined ? this : thisArg;

  for (let i = 0; i < this.length; i++) {
    if (cb.call(context, this[i], i, this) === true) {
      return this[i];
    }
  }

  return undefined;
};

MyArray.prototype.slice = function(beginArg, endArg) {
  const resultArr = new MyArray();
  const { length } = this;
  let begin = null;
  let end = null;

  if (beginArg > this.length) {
    return resultArr;
  }

  begin = beginArg === undefined ? 0 : (length + beginArg) % length;

  if (endArg === undefined || endArg > length) {
    end = length;
  } else {
    end = (endArg + length) % length;
  }

  for (let i = begin; i < end; i++) {
    resultArr.push(this[i]);
  }

  return resultArr;
};

export default MyArray;