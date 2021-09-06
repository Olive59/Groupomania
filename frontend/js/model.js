/**
 * Le but de cette classe est d'encapsuler les méhtodes
 * pour pouvoir faire les appels Ajax. 
 */
class Model {

    /**
     * Cette méthode appelle une url et retourne son contenu après un parseJSON. 
     * @param {string} url 
     */
    static get(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            // appel ajax. 
            xhr.open('GET', url, true);
            //xhr.onerror = reject("Le serveur ne répond pas");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200 || xhr.status === 201) {
                        let content = JSON.parse(xhr.response);
                        resolve(content);
                    } else {
                        console.log("Get_error=",JSON.parse(xhr.response).error);
                        reject(xhr.status);
                    }
                }
            }
            console.log("xhr===",xhr);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("userToken"));
            xhr.send();
        });
    }

    // Nouvelle classe pour réaliser notre POST
    static post(url, data, method="POST") {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open(method, url);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("userToken"));
            req.send(data);
            req.onreadystatechange = function (aEvt) {
                if (req.readyState == 4) {
                    if (req.status == 200 || req.status == 201) {
                        console.log('dans model.js')
                        console.log("req=",req);
                        resolve(req.responseText);
                    } else {
                        console.log("REJECTED=", req);
                        reject(req);
                    }
                }
            }
        })
    }
    static postFetch(formData, method, url) {
        console.log("method=",method);
        console.log("url=",url);
        return new Promise(function (resolve, reject) {
            fetch(url, {
                    method: method,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("userToken")
                    },
                    body: formData
                })
                .then(response => {
                    if (response.status == 200 || response.status == 201) {
                        response.json()
                            .then(data => {
                                console.log("Data=", data);
                                resolve(data);
                            })
                    } else {
                        reject(response.status);
                    }
                })
                .catch(error => {
                    console.log("error=", error);
                })
        })
    }
}