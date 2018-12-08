import React from 'react';
import ReactDOM from 'react-dom';
import RouterApp from './router';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
//引入redux-devtools-extension的可视化工具（有点hack）
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)
sagaMiddleware.run(rootSaga)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RouterApp store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});