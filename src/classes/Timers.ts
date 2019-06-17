class Timers {
  state: NodeJS.Timeout[];

  constructor() {
    this.state = [];
  }

  get(): NodeJS.Timeout[] {
    return this.state;
  }

  append(timer: NodeJS.Timeout) {
    this.state = [
      ...this.state,
      timer
    ];
  }

  reset() {
    this.state = [];
  }
}

export default Timers;
