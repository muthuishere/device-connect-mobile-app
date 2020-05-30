
import {getApprovalUrl, getLoginUrl, getToken} from "../services/environment-service";
import {PostRequest, PostRequestWithToken} from "../services/HttpService";
import {updateTokenInStore} from "../app-config/configuration-action";
import {saveUserAndToken} from "./UserDataService";

export const loginToServer = (userLoginData) => new Promise((resolve, reject) => {

    let {user, password,approvalPassword} = userLoginData
        const url = getLoginUrl() ;
        const contents= {
                "user": user,
                "password": password,
                "approvalPassword": approvalPassword
                };



    PostRequest(url, contents)
        .then(res => {

            resolve(res)



        })
        .catch((e) => {

            console.error("login error",e.toString())
            reject(e)
        });



});



export const validateTokenInServer = (url,token) => new Promise((resolve, reject) => {



    const contents = {
        "action": "VALIDATE_TOKEN"
    };


    PostRequestWithToken(url, contents, token)
        .then(res => {


            resolve(res)
        })
        .catch((e) => {
            reject(e)
        });


});


export const updateUserInfoInStorage = (userInfo,token) => new Promise((resolve, reject) => {


    saveUserAndToken(userInfo,token)
        .then(res => {

            resolve(res)


        })
        .catch((e) => {

            console.error("login error",e.toString())
            reject(e)
        });



});


