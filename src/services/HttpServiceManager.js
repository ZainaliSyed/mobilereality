//
//  HttpServiceManager.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:37:25 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import axios from "axios";
import { showSpinner, hideSpinner } from "react-native-globalspinner";
import { FlashMessage } from "../reuseableComponents";

const log = (...msgs) => {
    if (process.env.NODE_ENV === "development") console.log(...msgs);
};

global.log = log;

class HttpServiceManager {
    static myInstance = null;
    static axiosInstance = null;
    userToken = "";
    static getInstance() {
        if (HttpServiceManager.myInstance == null) {
            HttpServiceManager.myInstance = new HttpServiceManager();
        }
        return this.myInstance;
    }

    static initialize = (baseURL, authHeader) => {
        HttpServiceManager.getInstance().axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 60000,
            headers: authHeader
        });
        HttpServiceManager.getInstance().axiosInstance.interceptors.request.use(
            function(config) {
                config.headers[
                    "user-token"
                ] = HttpServiceManager.getInstance().userToken;
                return config;
            },
            function(error) {
                global.log("header Config err:", error);
                return error;
            }
        );
    };

    multipleRequest = RequestArray => {
        if (HttpServiceManager.getInstance().axiosInstance !== null) {
            return new Promise((resolve, reject) => {
                axios
                    .all(RequestArray)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(checkError(error));
                    });
            });
        } else {
            console.warn(
                'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
            );
        }
    };

    getRequestObject = (requestName, parameters, method) => {
        // showLoader(showHud);
        if (HttpServiceManager.getInstance().axiosInstance !== null) {
            return HttpServiceManager.getInstance().axiosInstance.request({
                method: method,
                url: requestName,
                params: parameters
            });
        } else {
            console.warn(
                'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
            );
        }
    };

    request = (requestName, parameters, method, showHud = true) => {
        if (showHud) {
            showSpinner();
        }
        const data = method === "get" ? null : parameters;
        if (HttpServiceManager.getInstance().axiosInstance !== null) {
            return new Promise((resolve, reject) => {
                let reqParam = {
                    method: method,
                    url: requestName,
                    data: data,
                    params: parameters
                };
                HttpServiceManager.getInstance()
                    .axiosInstance.request(reqParam)
                    .then(response => {
                        global.log(
                            "--------------------------------------------------------------------------------------",
                            "\n- REQUEST : ",
                            reqParam,
                            "\n- RESPONSE : ",
                            response,
                            "\n--------------------------------------------------------------------------------------"
                        );
                        console.log("RESPONSE", response);
                        if (response.status === 200) {
                            resolve({
                                response: response.data.data
                                // meta: response.data.meta,
                                // message: response.data.message
                            });
                        }
                        hideSpinner();
                    })
                    .catch(error => {
                        console.log("error", error);
                        hideSpinner();
                        reject(HttpServiceManager.checkError(error));
                    });
            });
        } else {
            console.warn(
                'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
            );
        }
    };

    static checkError = error => {
        global.log(
            "--------------------------------------------------------------------------------------",
            "\n- ERROR : ",
            error.response,
            "\n--------------------------------------------------------------------------------------"
        );
        let showError = "";
        if (
            error.response === undefined ||
            error.response.status === 503 ||
            error.response.status === 403
        ) {
            showError = error.message;
        } else if (error.response.status === 500) {
            FlashMessage({ message: "Html cannot be parsed" });
            return "Html cannot be parsed";
        } else if (error.response.status === 404) {
            var values = Object.keys(error.response.data.data).map(key => {
                return error.response.data.data[key];
            });
            showError = "• " + values.join("\n• ");
            global.log("showError: ", showError);
            FlashMessage({ message: showError });
            return showError;
        } else if (error.response.status === 400) {
            FlashMessage({ message: error.response.data.message });
            return error.response.data.message;
        } else {
            FlashMessage({ message: error.message });
            return error.message;
        }
    };
}

export default HttpServiceManager;
