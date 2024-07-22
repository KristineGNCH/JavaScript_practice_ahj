import checkGeolocation from "./checkGeo";
export default class WidgetTimeLine {
  constructor() {
    this.container = document.querySelector(".root");
  }

  initHandlers() {
    this.postForm = this.container.querySelector(".timeline_form");
    this.controlBar = this.container.querySelector(
      "[data-id=timelineControls]"
    );

    this.postForm.addEventListener("submit", (event) => {
      this.submitPost(event);
    });

    this.controlBar.addEventListener("click", (event) => {
      if (!event.target.closest(".timeline_button")) return;
      this.toggleControls();
    });
  }

  toggleControls() {
    this.controlBar.children.forEach((controlBarEl1) =>
      controlBarEl1.classList.toggle("hidden")
    );
  }

  showModalManualCoords() {
    if (this.container.querySelector(".modal")) return;
    const modalManualCoordsHtml = `
    <div  class="modal">
      <div class="modal_content modal_manual_coords">
        <div>
          <p>Что-то пошло не так</p>
          <p>К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную</p>
          <p>Широта и долгота через запятую</p>
        </div>
        <form  class="modal_form">
          <input  name="coords" class="modal_input" placeholder="Введите координаты, например: -90.12345, 180.12345" required>
          <div class="modal_footer">
            <span class="modal_footer_string hidden">
            </span>
          </div> 
          <div class="modal_form_controls"> 
            <button type="reset"  class="modal_button button_cancel">Отмена</button> 
            <button type="submit"  class="modal_button button_ok">Ок</button> 
          </div>
        </form>       
      </div>
    </div>
    `;

    this.container.insertAdjacentHTML("afterBegin", modalManualCoordsHtml);

    const modalPopup = this.container.querySelector(".modal_form");
    const modalForm = modalPopup.querySelector(".modal_form");
    modalForm.setAttribute('novalidate', true);

    modalForm.addEventListener("reset", () => {
      modalForm.closest("[data-modal=modal]").remove();
      this.addPost(this.postContent);
    });

    modalForm.addEventListener("input", () => {
      if (modalForm.coords.classList.contains("invalid"))
        modalForm.coords.classList.remove("invalid");
    });

    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValue = modalForm.coords.value.trim();
      modalForm.coords.setCustomValidity("");

      const formValidity = checkGeolocation(inputValue);
      this.coordsObj = formValidity;

      const errorMessageCoords = "Координаты введены неверно.";
      const errorMessageLat =
        "Широта должна быть в пределах -90...+90 градусов.";
      const errorMessageLng =
        "Долгота должна быть в пределах -180...+180 градусов.";
      modalForm.coords.classList.add("invalid");

      if (inputValue === "") {
        modalForm.coords.reportValidity();
        return;
      }

      if (!this.coordsObj.lng && !this.coordsObj.lat) {
        const errorMessage = `
        ${errorMessageCoords}
        ${errorMessageLat}
        ${errorMessageLng}
        `;
        modalForm.coords.setCustomValidity(errorMessage);
        modalForm.coords.reportValidity();
        return;
      }

      if (this.coordsObj.lng && !this.coordsObj.lat) {
        const errorMessage = `
        ${errorMessageCoords}
        ${errorMessageLat}
        `;
        modalForm.coords.setCustomValidity(errorMessage);
        modalForm.coords.reportValidity();
        return;
      }

      if (!this.coordsObj.lng && this.coordsObj.lat) {
        const errorMessage = `
        ${errorMessageCoords}
        ${errorMessageLng}
        `;
        modalForm.coords.setCustomValidity(errorMessage);
        modalForm.coords.reportValidity();
        return;
      }

      this.addPost(this.postContent, this.coordsObj.lat, this.coordsObj.lng);
      modalPopup.remove();
    });
  }

  init() {
    if (this.container.querySelector(".timeline_container")) return;
    const widgetTimelineHtml = `
        <div class="timeline_container">
          <div class="posts">
          </div>    
          <form class="modal_form timeline_form">
            <input name="post" placeholder="Введите Ваше сообщение и нажмите ENTER" class="timeline_input" required>   
            <div data-id="timelineControls" class="timeline_controls"></div>
          </form>
        </div> 
      `;

    this.container.insertAdjacentHTML("afterBegin", widgetTimelineHtml);

    this.initHandlers();
  }

  submitPost(event) {
    event.preventDefault();
    const inputValue = this.postForm.post.value.trim();
    if (inputValue === "") return;
    this.postContent = inputValue;
    this.checkGeoLocAPI(this.postContent);
    this.postForm.reset();
  }

  checkGeoLocAPI(postContent) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.addPost(postContent, latitude, longitude);
        },
        (error) => {
          console.error(error);
          this.showModalManualCoords();
        }
      );
    } else {
      console.log("browser geo API - false");
      this.showModalManualCoords();
    }
  }

  addPost(postContent, latitude, longitude) {
    const postBoard = this.container.querySelector(".posts");
    if (!postBoard) return;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    let coordinates;
    if (latitude && longitude) {
      coordinates = `[${latitude}, ${longitude}]`;
    } else {
      coordinates = "[-,-]";
    }

    const postElement = document.createElement("div");
    const timeStampEl = document.createElement("span");
    const postContentEl = document.createElement("div");
    const coordsEl = document.createElement("span");

    postElement.classList.add("post_content");
    postElement.dataset.id = "postContent";
    timeStampEl.innerText = `${date} ${time}`;
    postContentEl.append(postContent);
    coordsEl.innerHTML = `${coordinates} &#128065;`;

    postElement.append(timeStampEl);
    postElement.append(postContentEl);
    postElement.append(coordsEl);
    postBoard.prepend(postElement);

    this.postContent = null;
  }
}
