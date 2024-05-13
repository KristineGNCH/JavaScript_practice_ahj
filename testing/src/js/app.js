/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import luhnAlgorithm from "./luhnAlgorithm";

const form = document.getElementById("form");
const input = document.getElementById("card_number");
const validCard = document.getElementsByName("valid");

function cardValidation() {
  if (validCard) {
    validCard.classList.remove("valid");
  }
}

function paymentMethod(value) {
  if (/^4/.test(value)) {
    return "visa";
  }
  if (/^5[1-5]/.test(value)) {
    return "mastercard";
  }
  if (/^3[47]/.test(value)) {
    return "amex";
  }
  if (/^(?:2131|1800|35\d{3})\d{11}/.test(value)) {
    return "jcb";
  }
  if (/^3(?:0[0-5]|[68])/.test(value)) {
    return "diners_club";
  }
  if (/^2/.test(value)) {
    return "mir";
  }
  return null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cardValidation();

  const insert = input.value.replace(/\s/g, "");
  const paymentCard = document.querySelector(`.${paymentMethod(insert)}`);

  if (luhnAlgorithm(insert)) {
    validCard.textContent = "This card is valid";
    validCard.setAttribute("style", "color:green;");
    paymentCard.classList.add("valid");
  } else {
    validCard.textContent = "This card is not valid";
    validCard.setAttribute("style", "color:red;");
  }
});
