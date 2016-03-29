import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './containers/App';
import h from 'react-hyperscript';

const store = configureStore();

var appContainer = document.createElement('div')
appContainer.id = 'app-container'
document.body.appendChild(appContainer)


render(
  h(Provider, { store }, [ h(App) ]),
  appContainer
);
