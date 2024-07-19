export default class Popup {
  constructor() {
    this.container = document.querySelector(".root");
  }

  showPopup() {
    if (this.container.querySelector(".modal")) return;
    const modalHtml = `
      <div class="modal">
        <div  class="modal_content modal_notification">
          <div>
            <p>Oops..</p>
            <p>К сожалению, не удалось ничего записать,
              пожалуйста, предоставьте доступ на использование микрофона,
              либо воспользуйтесь другим браузером</p>          
          </div>
          <button type="submit" class="modal_button button_ok">Ок</button> 
        </div>
      </div>
      `;

    this.container.insertAdjacentHTML("afterBegin", modalHtml);
    const modalPopup = this.container.querySelector(".modal");
    const modalButtonOK = modalPopup.querySelector(".button_ok");
    modalButtonOK.addEventListener("click", (event) => {
      event.preventDefault();
      modalPopup.remove();
    });
  }
}
