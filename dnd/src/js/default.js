import makeNewCard from './app';
import DragDrop from './DnD';

document.addEventListener('DOMContentLoaded', () => {
  const todo = document.querySelector('.todo-list');
  const progress = document.querySelector('.progress-list');
  const done = document.querySelector('.done-list');

  makeNewCard('Welcome to Trello!', todo);
  makeNewCard('This is a card.', todo);

  makeNewCard('Click on a card to see what\'s behind it.', progress);
  makeNewCard('Finished with a card? Delete it.', progress);

  makeNewCard('To learn more tricks, check out the guide.', done);
  makeNewCard('Want to use keyboard shortcuts? We have them!', done);

  const allCards = document.querySelectorAll('.list-item');
  const allLists = document.querySelectorAll('.list');

  DragDrop(allCards, allLists);
});
