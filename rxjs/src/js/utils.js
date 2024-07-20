export const body = document.querySelectorAll(".container");
export const elemTable = document.querySelector(".table");
export const elemFormChat = document.querySelector(".form");
export const elemInput = document.querySelector(".input-chat");

export function getDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  return `${hour}:${minutes} ${date.getDate()}.${month}.${date.getFullYear()}`;
}

export function getMessage(from, user, received) {
  return `
    <tr><td>${from}</td><td>${user}</td><td>${received}</td></tr>
  `;
}
