export default class Actions {
  constructor(container, btn) {
    this.el = container;
    this.btn = btn;
  }

  init() {
    this.btn.addEventListener('click', () => {
      if (!this.el.classList.contains('show-text')) {
        this.el.classList.add('show-text');
        this.el.classList.remove('hidden-text');
      } else {
        this.el.classList.add('hidden-text');
        this.el.classList.remove('show-text');
      }
    });
  }
}
