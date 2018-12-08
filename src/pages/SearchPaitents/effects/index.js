import { takeEvery} from 'redux-saga/effects';
// import requestServices from '../../../services/index'
function * testSearch(){
    yield console.log('')
}
export function* searchPaitents() {
    yield takeEvery('test_search', testSearch)
}
