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
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
const sagaMiddleware = createSagaMiddleware()

const store = window.store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <div>
        <LocaleProvider locale={zh_CN}>
            <RouterApp store={store} />
        </LocaleProvider>
    </div>, 
    document.getElementById('root')
)
registerServiceWorker();
