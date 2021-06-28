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
            document.querySelector("header").innerHTML = /*html*/ 
                `<header class="logo">
                <a class="big" href="index.html"><img src="images/header.png" alt="logo de groupomania"></a>
                </header>`;
        }
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    static signUp() {
        View.displayHeader(main);
        main.innerHTML = /*html*/ `
        <div class="page">
        <div id="box">
            <form method="post" action="">
                
                <h2>Créer un compte</h2>                
                
                <div class="champ">
                    <input type="pseudo" name=" pseudo" placeholder="Pseudo" />
                </div> 
                <div class="champ">
                    <input type="email" name=" email" placeholder="E-mail" />
                </div> 
                <div class="champ">
                    <input :type="leType" name="pass" placeholder="Password" />
                    
                </div>                 
            </form>
        </div>
        </div>
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
                    <i class="far fa-eye-slash item"></i>
                    <i class="far fa-eye item"></i>
                </div>   
                <input type="submit" value="Entrer" />
            </form>
            <button onclick="View.signUp(this)">Pas encore membre ?</button>
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