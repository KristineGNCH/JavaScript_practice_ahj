/* eslint-disable linebreak-style */
export default class CardValidator {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.checkCard = this.checkCard.bind(this);
  }

  showType() {
    return this.type;
  }

  checkCard(value) {
    this.cards.forEach((item) => item.classList.add('hide'));
    this.type = null;

    if (value.startsWith('4')) {
      this.highlightCard('visa');
      this.type = 'Visa';
      return;
    }

    if (value.startsWith('5') && value[1] > 0 && value[1] < 6) {
      this.highlightCard('mastercard');
      this.type = 'Mastercard';
      return;
    }

    if (value.startsWith('34') || value.startsWith('37')) {
      this.highlightCard('american-express');
      this.type = 'American Express';
      return;
    }

    if (value.startsWith('35')) {
      this.highlightCard('jcb');
      this.type = 'JCB';
      return;
    }

    if (value.startsWith('36') || value.startsWith('6011')) {
      this.highlightCard('diners-club');
      this.type = 'Diners Club';
      return;
    }

    if (value.startsWith('2')) {
      this.highlightCard('mir');
      this.type = 'Mir';
      return;
    }

    if (this.type === null) {
      [...this.cards].forEach((item) => item.classList.remove('hide'));
      this.type = 'This payment method is not supported by our system';
    }
  }

  highlightCard(type) {
    [...this.cards]
      .find((item) => item.classList.contains(type))
      .classList.remove('hide');
  }
}
