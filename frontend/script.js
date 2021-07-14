let pass       = document.getElementById('pass');
let voirPass   = document.getElementById('voirPass');


// Ouvrir et fermer l'oeil du Password
voirPass.addEventListener('click', function() {
    if(this.classList[1] == "fa-eye-slash") {
        this.classList.replace('fa-eye-slash', 'fa-eye');
        pass.type = "text";
    } else {
        this.classList.replace('fa-eye', 'fa-eye-slash');
        pass.type = "password";
    }
});