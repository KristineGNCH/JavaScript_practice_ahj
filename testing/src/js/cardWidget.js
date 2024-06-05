/* eslint-disable linebreak-style */
import CardValidator from './cardValidator';

export default class CardWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.cardTypes = [
      'visa',
      'mastercard',
      'american-express',
      'jcb',
      'diners-club',
      'mir',
    ];
  }

  static get markup() {
    return `
    <ul id="cards" class="cards list-unstyled"></ul>
    <form id="form" class="form-inline" novalidate="novalidate" required">
    <div class="form-group">
    <input
      class="form-control col-md-6"
      id="card_number"
      name="card_number"
      type="text"
      placeholder="Please insert a credit card number"
      data-original-title=""
      title=""
      aria-describedby="tooltip28076"
      required/>
    <div
    class="tooltip fade bottom in"
    role="tooltip"
    id="tooltip28076"
    style="top: 99.0156px; left: 237px; display: block">
    <div class="tooltip-arrow" style="left: 50%"></div>
  </div>
  <button class="button">Click to Validate</button>
  </div>
</form> --- `;
  }

  bindToDOM() {
    this.parentEl.insertAdjacentHTML('beforeend', CardWidget.markup);

    this.ul = this.parentEl.querySelector('.cards');
    this.input = this.parentEl.querySelector('.form-control');

    this.cardTypes.forEach((card) => {
      const li = document.createElement('li');
      li.classList.add('card', card);
      li.setAttribute('title', card);
      this.ul.append(li);
    });

    this.cardValidator = new CardValidator();

    this.input.addEventListener('input', () => this.cardValidator.checkCard(this.input.value));
  }

  messageStatus(text) {
    this.form = document.getElementById('form');
    this.clearmessage();
    const message = document.createElement('p');
    if (text === 'empty') {
      message.classList.add('error-message');
      message.textContent = 'Please enter your credit card number to continue';
    }
    if (text === 'invalid-number') {
      message.classList.add('error-message');
      message.textContent = 'Please, enter more digits';
    }
    if (text === 'invalid-card') {
      message.classList.add('error-message');
      message.textContent = `Your card number is incorrect.\n ${this.cardValidator.showType()}`;
    }
    if (text === 'valid-card') {
      message.classList.add('success-message');
      message.textContent = `This card number is valid f\n ${this.cardValidator.showType()}`;
    }
    this.form.insertAdjacentElement('afterend', message);
  }

  clearmessage() {
    const removeEl = this.form.nextElementSibling;
    if (removeEl) {
      removeEl.remove();
    }
  }
}
