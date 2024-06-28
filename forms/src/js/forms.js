/* eslint-disable linebreak-style */
export default class Forms {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `<div class="container">
          <div class="form">
            <h3 class="form-header">Popover title</h3>
            <p class="form-text">And here's some amazing content. It's very engaging. Right?</p>
          </div>
          <button type="button" title="form title">Click to toggle popover</button>
        </div>`;
  }

  static get buttonSelector() {
    return 'button';
  }

  static get popoverSelector() {
    return '.form';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;

    const click = this.parentEl.querySelector(this.constructor.buttonSelector);
    click.addEventListener('click', () => this.onClick());
  }

  onClick() {
    const popover = this.parentEl.querySelector(
      this.constructor.popoverSelector,
    );
    popover.classList.toggle('active');
  }
}
