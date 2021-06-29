const serverUrl = "http://localhost:3000";
class Controller {
    static getFormData(formData) {
        let objectData = {};
        formData.forEach(function (value, key) {
            objectData[key] = value;
        });
        return (objectData);
    }
    static wall() {
        if (!localStorage.getItem("userId")) {
            View.signIn();
            return;
        }
        View.wall();
        
    }
    static signUp(form) {
        var formData = Controller.getFormData(new FormData(form));
        console.log("formData=", formData);
        Model.post(serverUrl + '/api/user/signup', JSON.stringify(formData))
            .then(function (response) {
                let user = JSON.parse(response);
                localStorage.setItem("userId", user.userId);
                localStorage.setItem("userToken", user.token);
                Controller.wall();
            })
            .catch(function (req) {
                console.error("NOK", JSON.parse(req.responseText).error);
                View.showError(JSON.parse(req.responseText).error);
            })
    }
    static signIn(form) {
        var formData = Controller.getFormData(new FormData(form));
        Model.post(serverUrl + '/api/user/login', JSON.stringify(formData))
            .then(function (response) {
                let user = JSON.parse(response);
                console.log("user=", user);
                localStorage.setItem("userId", user.userId);
                localStorage.setItem("userToken", user.token);
                Controller.wall();
            })
            .catch(function (req) {
                View.showError(req.responseText);
            })
    }
    static logout() {
        localStorage.clear();
        View.signIn();
    }
}