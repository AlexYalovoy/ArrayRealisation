interface IMyArray {
  length: number;
}

class MyArray implements IMyArray {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }
      this.length = args.length;
    }
  }

  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }
  
  pop() {
    if (this.length === 0) {
      return;
    }
  
    const lastItem = this[this.length - 1];
    this.length -= 1;
    delete this[this.length];
    return lastItem;
  }
  
  toString() {
    let resultStr = '';
  
    if (this.length > 0) {
      for (let i = 0; i < this.length - 1; i++) {
        resultStr += `${this[i]},`;
      }
      resultStr += `${this[this.length - 1]}`;
    }
  
    return resultStr;
  }
  
  map(cb, thisArg = this) {
    const resultArr = new MyArray();
  
    for (let i = 0; i < this.length; i++) {
      resultArr[resultArr.length] = cb.call(thisArg, this[i], i, this);
      resultArr.length += 1;
    }
  
    return resultArr;
  }
  
  forEach(cb, thisArg = this) {
    for (let i = 0; i < this.length; i++) {
      cb.call(thisArg, this[i], i, this);
    }
  }
  
  reduce(cb, initValue) {
    if (this.length === 0 && initValue !== undefined) {
      return initValue;
    }
  
    if (this.length === 0 && initValue === undefined) {
      throw new TypeError();
    }
  
    let accumulator = initValue === undefined ? this[0] : cb(initValue, this[0], 0, this);
  
    for (let i = 1; i < this.length; i++) {
      accumulator = cb(accumulator, this[i], i, this);
    }
  
    return accumulator;
  }
  
  from(source, cb, thisArg = this) {
    const resultArr = new MyArray();
  
    for (let i = 0; i < source.length; i++) {
      let newElem = null;
  
      if (cb === undefined) {
        newElem = source[i];
      } else {
        newElem = cb.call(thisArg, source[i], i, this);
      }
  
      resultArr[resultArr.length] = newElem;
      resultArr.length += 1;
    }
  
    return resultArr;
  }
  
  sort(cb) {
    let callback = cb;
  
    if (!callback) {
      callback = function(a, b) {
        const firstArg = `${a}`;
        const secondArg = `${b}`;
  
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
  }
  
  [Symbol.iterator]() {
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
  }
  
  filter(cb, thisArg = this) {
    const resultArr = new MyArray();
  
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        resultArr[resultArr.length] = this[i];
        resultArr.length += 1;
      }
    }
  
    return resultArr;
  }
  
  find(cb, thisArg = this) {
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }
  
  slice(beginArg, endArg) {
    const resultArr = new MyArray();
    let begin = 0;
    let end = this.length;
  
    if (beginArg > this.length) {
      return resultArr;
    }
  
    if (beginArg > 0) {
      begin = beginArg;
    }
  
    if (beginArg < 0 && Math.abs(beginArg) < this.length) {
      begin = this.length + beginArg;
    }
  
    if (endArg >= 0 && endArg <= this.length) {
      end = endArg;
    }
  
    if (endArg < 0) {
      end = this.length + endArg;
    }
  
    for (let i = begin; i < end; i++) {
      resultArr[resultArr.length] = this[i];
      resultArr.length += 1;
    }
  
    return resultArr;
  }
  
  [Symbol.toPrimitive](hint) {
    switch (hint) {
    case 'string':
      return this.toString();
  
    case 'number':
      return this.length;
  
    default:
      return this.length;
    }
  }
}