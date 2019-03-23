import { all } from 'redux-saga/effects';
import { main } from '../pages/Main/effects/index';
import { index } from '../pages/Index/effects/index';
import { login } from '../pages/Login/effects/index';
import { bedSet } from '../pages/BedSet/effects/index';
import { warningSet } from '../pages/WarningSet/effects/index';
import { admissionHospital } from '../pages/AdmissionHospital/effects/index';
import { warningDetails } from '../pages/WarningDetails/effects/index';
import { dataStatistics } from '../pages/DataStatistics/effects'
import { visualCharts } from '../pages/VisualCharts/effects'
import { searchPaitents } from '../pages/SearchPaitents/effects'
import { message } from '../pages/Message/effects'

export default function* rootSaga() {
  yield all([
        login(),
        main(),
        index(),
        bedSet(),
        warningSet(),
        admissionHospital(),
        warningDetails(),
        dataStatistics(),
        visualCharts(),
        searchPaitents(),
        message(),
    ])
}
