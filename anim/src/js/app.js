import Actions from './Actions';

const container = document.querySelector('.container');
const button = document.querySelector('.btn');

const action = new Actions(container, button);
action.init();
