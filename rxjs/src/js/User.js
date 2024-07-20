export default class User {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    next(value) {
        this.observers.forEach(observer => console.log(observer));
    }
}