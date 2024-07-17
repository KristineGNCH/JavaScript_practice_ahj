/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint no-cond-assign: "error" */
export default class LuhnAlgorithm {
  constructor(widget) {
    this.cardWidget = widget;
    this.input = document.querySelector('.input');
    this.form = document.getElementById('form');
    this.checkNumber = this.checkNumber.bind(this);
  }

  init() {
    this.form.addEventListener('submit', this.checkNumber);
  }

  checkNumber(e) {
    e.preventDefault();
    const { value } = this.input;

    if (value.length === 19 || (value.length >= 13 && value.length <= 16)) {
      const checkDigit = Number(value[value.length - 1]);
      const nCheck = this.сalcCheckDigit(value);
      if (nCheck === checkDigit) {
        this.cardWidget.messageStatus('valid-card');
      } else {
        this.cardWidget.messageStatus('invalid-card');
      }
    } else if (value.length === 0) {
      this.cardWidget.messageStatus('empty');
    } else {
      this.cardWidget.messageStatus('invalid-number');
    }
  }

  сalcCheckDigit(value) {
    const invertedArr = value
      .slice(0, value.length - 1)
      .split('')
      .reverse()
      .map(Number);

    invertedArr.forEach((item, idx) => {
      if (idx === 0 || idx % 2 === 0) {
        invertedArr[idx] = item * 2;
      }
    });
    invertedArr.forEach((item, idx) => {
      if (item > 9) {
        invertedArr[idx] = item - 9;
      }
    });
    const sum = invertedArr.reduce((acc, item) => acc + item);
    return 10 - (sum % 10);
  }
}
