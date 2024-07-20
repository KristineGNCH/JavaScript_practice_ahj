import App from './app';
import { elemFormChat } from './utils';

const App = new App();

elemFormChat.addEventListener('submit', (e) => {
  e.preventDefault();
  App.getPost();
});

App.getStream();
