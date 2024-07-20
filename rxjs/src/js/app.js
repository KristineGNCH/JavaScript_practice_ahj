import {
  elemFormChat,
  elemInput,
  elemTable,
  getMessage,
  getDate,
} from "./utils";

import { ajax } from "rxjs/ajax";
import { interval } from "rxjs";

export default class App {
  constructor() {
    this.data = undefined;
    this.lastIdMessage = undefined;
  }

  getStreamMessage() {
    const renderMessages$ = ajax.getJSON(
      "http://localhost:3010/?method=getMessages"
    );
    renderMessages$.subscribe({
      next: (value) => {
        const lastIdMessageResponse =
          value.response.messages[value.response.messages.length - 1].id;
        if (!this.lastIdMessage) {
          value.response.messages.forEach((a) => {
            let { id, user, received } = a;
            if (user.length > 15) user = user.substring(0, 15) + "...";
            elemTable.insertAdjacentHTML(
              "beforeend",
              getMessage(a.from, user, getDate(received * 1000))
            );
            this.lastIdMessage = id;
          });
        } else if (this.lastIdMessage !== lastIdMessageResponse) {
          for (
            let i = this.lastIdMessage;
            i <= lastIdMessageResponse - 1;
            i += 1
          ) {
            let { id, user, received } = value.response.messages[i];
            if (user.length > 15) user = user.substring(0, 15) + "...";
            elemTable.insertAdjacentHTML(
              "beforeend",
              getMessage(
                value.response.messages[i].from,
                user,
                getDate(received * 1000)
              )
            );
            this.lastIdMessage = id;
          }
        }
      },
      error: (err) => console.log("Новых сообщений нет"),
    });
  }

  getStream() {
    const source = interval(3000);
    const subscribe = source.subscribe(() => this.getStreamMessage());
  }

  getPost() {
    const text = elemInput.value;
    const formData = new FormData();
    const date = String(Date.now());
    const dateStr = date.substring(0, date.length - 3);
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:3010/?method=addMessage";

    formData.append("user", text);
    formData.append("from", "user@user");
    formData.append("body", "Long message body here");
    formData.append("received", dateStr);


    xhr.open("POST", url);
    xhr.send(formData);

    elemFormChat.reset();

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          this.data = JSON.parse(xhr.responseText);
          console.log(this.data);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
}
