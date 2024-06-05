/* eslint-disable class-methods-use-this */
export default class NewForm {
  createForm() {
    const form = document.createElement('form');
    form.classList.add('add-card');
    form.innerHTML = ` <textarea name="card-title" class="card-title-field" rows = "5" placeholder="Enter a title for this card..."></textarea>
              <div class="input-container">
                  <div class="input-block">
                      <input type="submit" value="Add Card" class="input-add-card">
                      <div class="close-btn">
                          <i class="fas fa-lg fa-times"></i>
                      </div>
                  </div>
                  <div class="menu-block">
                      <i class="fas fa-lg fa-ellipsis-h"></i>
                  </div>
              </div>`;

    return form;
  }

  closeForm(thisForm, addBlock, formParent) {
    const closeBtn = thisForm.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      thisForm.reset();
      formParent.removeChild(thisForm);
      addBlock.classList.remove('hidden');
    });
  }

  afterSubmit(thisForm, addBlock, formParent) {
    thisForm.reset();
    formParent.removeChild(thisForm);
    addBlock.classList.remove('hidden');
  }

  addCardTitle(thisForm) {
    const textarea = thisForm.querySelector('.card-title-field');
    return textarea.value;
  }
}
