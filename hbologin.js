// ==UserScript==
// @name         AutoLogin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Problema megoldasa!
// @author       Erik
// @match        https://hbogo.hu/
// @match        https://gateway.hbogo.hu/*
// @grant        none
// ==/UserScript==

setTimeout(() => {
    if(window.top === window.self){
        //window.addEventListener('load', (event) => {
            var login = document.getElementsByClassName("logged-out")[0];
            if(!login.classList.contains("hidden")){
                setTimeout(() => { LoginMain(); }, 1000);
            }
        //});
    }else{
        var check = document.getElementById("gw_operator_type_signin_b2b");
        if(check != null){
            setTimeout(() => { LoginFrame(check); }, 500);
        }
    }

}, 1000);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function LoginMain(){
    document.getElementById("signin").click();
}

function LoginFrame(login){
    login.click();
    var selector = document.querySelector("div.dropdown-placeholder.closed");
    var selectorExists = setInterval(function(){
        if(selector != null){
            selector.click();
            var options = document.getElementsByClassName("dropdown-list-element");
            options[options.length - 1].click();
            var email = document.getElementById("1");
            var emailExists = setInterval(function(){
                if(email != null){
                    var ev = new Event('input');
                    email.value = "EMAIL";
                    email.dispatchEvent(ev);
                    var password = document.getElementById("5");
                    password.value = "PASSWORD";
                    password.dispatchEvent(ev);
                    setTimeout(() => {document.getElementById("gw_login_06_sign_in").click()}, 1000);
                    clearInterval(emailExists);
                }else{
                    email = document.getElementById("1");
                }
            }, 100);
            clearInterval(selectorExists);
        }else{
            selector = document.querySelector("div.dropdown-placeholder.closed");
        }
    }, 100);
}