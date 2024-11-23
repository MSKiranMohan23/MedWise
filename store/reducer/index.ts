import { combineReducers} from '@reduxjs/toolkit';

import drugInfoReducer from '@/store/actions/drugInfoSlice';

const rootReducer = combineReducers({
    drugInfoReducer : drugInfoReducer
})

export default rootReducer;