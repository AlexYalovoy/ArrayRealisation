interface IMyArray<T> {
  length: number;
  [key: number]: T;
}

class MyArray<T> implements IMyArray<T> {
  length: number;
  [key: number]: T;

  constructor(...args: any[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0];
    } else {
      for (let i : number = 0; i < args.length; i++) {
        this[i] = args[i];
      }
      this.length = args.length;
    }
  }
}