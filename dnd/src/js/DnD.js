export default function DragDrop(cards, lists) {
  function getNextElement(cursorPosition, currentElement) {
    const currentElCoordinates = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElCoordinates.y + currentElCoordinates.height / 2;
    const nextEl = cursorPosition < currentElementCenter
      ? currentElement
      : currentElement.nextElementSibling;

    return nextEl;
  }

  [...cards].forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      e.target.classList.add('selected');
    });

    card.addEventListener('dragend', (e) => {
      e.target.classList.remove('selected');
    });

    [...lists].forEach((list) => {
      list.addEventListener('dragover', (e) => {
        e.preventDefault();

        const activeElement = document.querySelector('.selected');
        const currentElement = e.target;
        const isMoveAble = activeElement !== currentElement
          && currentElement.classList.contains('list-item');
        const nextElement = getNextElement(e.clientY, currentElement);

        if (!isMoveAble) {
          return;
        }

        if (
          nextElement
          && (activeElement === nextElement.previousElementSibling
            || activeElement === nextElement)
        ) {
          return;
        }

        list.insertBefore(activeElement, nextElement);
      });
    });
  });
}
