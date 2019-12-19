//
//  ServiceAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:24 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { GENERAL_ACTION, LOGIN, LOGOUT } from "./ActionTypes";

callback = () => {};
export function request(
    types,
    service,
    service_type,
    data,
    showHud,
    successCB = callback,
    failureCB = callback
) {
    return {
        payload: data,
        service,
        service_type,
        type: GENERAL_ACTION,
        request_type: types,
        showHud,
        successCB,
        failureCB
    };
}

export function success(types, data) {
    return {
        data,
        type: types.SUCCESS
    };
}

export function failure(types, errorMessage) {
    return {
        errorMessage,
        type: types.FAILURE
    };
}
export function logout() {
    return {
        type: LOGOUT
    };
}

// export function failure(errorMessage: Object) {
//     return {
//         errorMessage,
//         type: LOGIN.FAILURE
//     };
// }
