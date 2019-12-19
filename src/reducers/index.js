//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:21:40 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import {
  LOGIN,
  SOCKET_INFO,
  LIST_GEOFANCE,
  USER_LOCATION,
  REAL_TIME_TRACKING,
  LOGOUT,
  SOCKET_DUMP,
  HOUSE,
  HOUSE_DETAIL,
} from '../actions/ActionTypes';
import userLocation from '../reducers/userLocation';
const appReducer = combineReducers({
  //loginReducer: serviceReducer(LOGIN),
  userLocation,
  houseList: serviceReducer(HOUSE),
  houseDetail: serviceReducer(HOUSE_DETAIL),
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    const {loginReducer, ...rest} = state;
    state = {
      ...rest,
      loginReducer: {...loginReducer, data: []},
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
