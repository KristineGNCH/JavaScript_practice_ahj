/* eslint-disable linebreak-style */
import CardWidget from './cardWidget';
import LuhnAlgorithm from './luhnAlgorithm';

const cardWidget = new CardWidget(document.querySelector('.cards-widget'));
cardWidget.bindToDOM();

const luhnAlgorithm = new LuhnAlgorithm(cardWidget);
luhnAlgorithm.init();
