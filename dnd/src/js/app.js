/* eslint no-param-reassign: "error" */
import NewForm from './addForm';
import Card from './Card';
import DragDrop from './DnD';

const addNewForm = new NewForm();
const addCard = document.querySelectorAll('.add-card-container');
const allLists = document.querySelectorAll('.list');

const allCardsArr = [];

export default function makeNewCard(title, list) {
  const newCard = new Card(title);
  allCardsArr.push(newCard);
  allCardsArr.forEach((item, index) => { item.id = index; });
  newCard.createNewCard(newCard, list, allCardsArr);
}

[...addCard].forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.closest('.list-container');
    const list = parent.querySelector('.list');

    item.classList.remove('list-item');
    item.classList.add('hidden');
    const form = addNewForm.createForm();
    parent.appendChild(form);
    addNewForm.closeForm(form, item, parent);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      makeNewCard(addNewForm.addCardTitle(form), list);

      addNewForm.afterSubmit(form, item, parent);

      const allCards = document.querySelectorAll('.list-item');

      DragDrop(allCards, allLists);
    });
  });
});
