interface IMyArrayble<T> {
  length: number;
  [key: number]: T;
}

class MyArray<T> implements IMyArrayble<T> {
  length: number;
  [key: number]: T;

  constructor(...args: T[] | number[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0] as number;
    } else {
      for (let i : number = 0; i < args.length; i++) {
        this[i] = args[i] as T;
      }
      this.length = args.length;
    }
  }

  push(...args : Array<T>): number {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }
  
    const lastItem: T = this[this.length - 1];
    this.length -= 1;
    delete this[this.length];
    return lastItem;
  }

  toString(): string {
    let resultStr: string = '';
  
    if (this.length > 0) {
      for (let i: number = 0; i < this.length - 1; i++) {
        resultStr += `${this[i]},`;
      }
      resultStr += `${this[this.length - 1]}`;
    }
  
    return resultStr;
  }
  
  map<U>(cb: (element: T, index: number, pointer: MyArray<T>) => U, thisArg: any = this): MyArray<U> {
    const resultArr: MyArray<U> = new MyArray<U>();
  
    for (let i = 0; i < this.length; i++) {
      resultArr[resultArr.length] = cb.call(thisArg, this[i], i, this);
      resultArr.length += 1;
    }
  
    return resultArr;
  }
  
  forEach(cb: (element: T, index: number, pointer: MyArray<T>) => void, thisArg: any = this): void {
    for (let i = 0; i < this.length; i++) {
      cb.call(thisArg, this[i], i, this);
    }
  }
  
  reduce(cb: (accumulator: any, element: T, index: number, pointer: MyArray<T> ) => any, initValue?: any): any {
    if (this.length === 0 && initValue !== undefined) {
      return initValue;
    }
  
    if (this.length === 0 && initValue === undefined) {
      throw new TypeError();
    }
  
    let accumulator: any = initValue === undefined ? this[0] : cb(initValue, this[0], 0, this);
  
    for (let i = 1; i < this.length; i++) {
      accumulator = cb(accumulator, this[i], i, this);
    }
  
    return accumulator;
  }


  static from<T, U>(source: IMyArrayble<T>, cb: (element: T, index: number, pointer: MyArray<U>) => MyArray<U>, thisArg: any = this): MyArray<U> {
    const resultArr: MyArray<U> = new MyArray<U>();
  
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
  
  sort(cb?: (a: T, b: T) => number): MyArray<T> {
    let callback: (a: T, b: T) => number = cb;
  
    if (!callback) {
      callback = function(a: T, b: T): number {
        const firstArg: string = `${a}`;
        const secondArg: string = `${b}`;
  
        if (firstArg > secondArg) {
          return 1;
        } else if (secondArg > firstArg) {
          return -1;
        } else {
          return 0;
        }
      };
    }
  
    let insertedItem: T = null;
    let j: number = 0;
  
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

  filter(cb: (element: T, index: number, pointer: MyArray<T>) => any, thisArg: any = this): MyArray<T> {
    const resultArr: MyArray<T> = new MyArray<T>();
  
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        resultArr[resultArr.length] = this[i];
        resultArr.length += 1;
      }
    }
  
    return resultArr;
  }
  
  find(cb: (element: T, index: number, pointer: MyArray<T>) => any, thisArg: any= this): T | undefined {
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }
  
  slice(beginArg?: number, endArg?: number): MyArray<T> {
    const resultArr: MyArray<T> = new MyArray<T>();
    let begin: number = 0;
    let end: number = this.length;
  
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

  [Symbol.toPrimitive](hint: string): string | number {
    switch (hint) {
    case 'string':
      return this.toString();
  
    case 'number':
      return this.length;
  
    default:
      return this.length;
    }
  }

  [Symbol.iterator](): object {
    let index: number = 0;
    const that: MyArray<T> = this;
  
    return {
      next(): object {
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
}

export default MyArray;