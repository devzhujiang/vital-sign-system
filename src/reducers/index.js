import { combineReducers } from 'redux'
import { main } from '../pages/Main/reducer'
import { login } from '../pages/Login/reducer'
import { homePage } from '../pages/Index/reducer'
import { bedSet } from '../pages/BedSet/reducer'
import { warningSet } from '../pages/WarningSet/reducer'
import { admissionHospital } from '../pages/AdmissionHospital/reducer'
import { warningDetails } from '../pages/WarningDetails/reducer'
import { dataStatistics } from '../pages/DataStatistics/reducer'
import { visualCharts } from '../pages/VisualCharts/reducer'
import { searchPaitents } from '../pages/SearchPaitents/reducer'


export default combineReducers({
    main,
    homePage,
    login,
    bedSet,
    warningSet,
    admissionHospital,
    warningDetails,
    dataStatistics,
    visualCharts,
    searchPaitents,
})