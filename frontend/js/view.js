const main = document.querySelector("main");
class View {
    static displayHeader(parent) {
        if (localStorage.getItem("userId")) {
            document.querySelector("header").innerHTML = /*html*/ `
                <button onclick="Controller.wall();">Home</button>
                <button onclick="Controller.createArticle();">Ecrire un article</button>
                <button onclick="Controller.logout();">Déconnexion</button>
               
            `;
        } else {
            document.querySelector("header").innerHTML = ``;
        }
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    static signUp() {
        View.displayHeader(main);
        main.innerHTML = /*html*/ `
            <form method="post" onsubmit="Controller.signUp(this);return false;">
                <input type="text" name="name" required pattern="[A-Za-z \-'À-ÿ]{2,102}" placeholder="Nom" value="Bruno Paulet">  
                <input type="text" name="alias" required pattern="[A-Za-z \-'À-ÿ]{2,102}" placeholder="Alias" value="Bubulle">  
                <input type="email" name="email" required placeholder="E-mail" value="bruno@forumfamilia.net">  
                <input type="password" name="password" required placeholder="Mot de passe" value="Ilboued1%$">  
                <input type="submit" name="Inscription" value="S'inscrire">
            </form>
            <button onclick="View.signIn(this)">Se connecter</button>
       `;
    }
    static signIn() {
        View.displayHeader(main);
        main.innerHTML = /*html*/ `
            <form method="post" onsubmit="Controller.signIn(this);return false;">
                <input type="email" name="email" required placeholder="E-mail" >  
                <input type="password" name="password" required placeholder="Mot de passe" value="Ilboued1%$">  
                <input type="submit" name="Inscription" value="Se connecter">
            </form>
            <button onclick="View.signUp(this)">S'inscrire</button>
       `;
    }
    static showError(errorText) {
        alert(errorText);
    }
    static showImage(imageUrl) {
        if (imageUrl) {
            return `<img src="${serverUrl+'/'+imageUrl}"></img>`;
        }
        return "";
    }
    static wall() {
            View.displayHeader(main);
            let boxArticle = document.createElement("article");
            main.appendChild(boxArticle);
            boxArticle.innerHTML = /*html*/ `
                <h1>On est bien connecté !</h1>
            `
       
    }
  
}