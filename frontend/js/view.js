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
        <div class="page">
        <div id="box">
            <form method="post" action="">
                <h1>LOGIN</h1>
            
                <div class="champ">
                    <input type="email" name=" email" placeholder="E-mail" />
                </div> 
                <div class="champ">
                    <input :type="leType" name="pass" placeholder="Password" />
                    <i v-if="EyeClose" class="far fa-eye-slash item" @click="voir"></i>
                    <i v-if="EyeOpen" class="far fa-eye item" @click="cacher"></i>
                </div>   
                <input type="submit" value="Entrer" />
            </form>
            <a href="compte.html">Pas encore membre ?</a>
        </div>
    </div>
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