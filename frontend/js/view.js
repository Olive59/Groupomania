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
                <a href="index.html"><img class='bigLogo' src="images/logoMid.png" alt="logo de groupomania"></a>
                <a href="index.html"><img class='responsiveLogo' src="images/logoMin.png" alt="logo de groupomania"></a>
                </header>`;
        }
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    static signUp() {
        View.displayHeader(main);
        main.innerHTML = /*html*/ 
        `
        <div class="page">
            <div id="box">
                <form method="post" action="">
                    <h1>Créer un compte</h1>
                    <div class="champ">
                        <input type="pseudo" name=" pseudo" placeholder="Pseudo" />
                    </div> 
                    <div class="champ">
                        <input type="email" name=" email" placeholder="E-mail" />
                    </div> 
                    <div class="champ">
                        <input type="password" name="pass" id="pass" placeholder="Password">
                        <div class="fas fa-eye-slash item" id="voirPass"></div>
                    </div>  
                    <button class='login' type="submit" value="Entrer">Envoyer</button>
                </form>               
            </div>
        </div> 
       `
    }
    
    static signIn() {
        View.displayHeader(main);
        main.innerHTML = /*html*/ `
        <div class="page">
        <div id="box">
            <form method="post" onsubmit="Controller.signIn(this); return false;">
                <h1>LOGIN</h1>
            
                <div class="champ">
                    <input type="email" name=" email" placeholder="E-mail" />
                </div> 
                <div class="champ">
                    <input type="password" name="pass" id="pass" placeholder="Password">
                    <div class="fas fa-eye-slash item" id="voirPass"></div>
                </div> 
                <button class='login' onclick="View.wall(this)">Se connecter</button>
            </form>
            <button class='inscription' onclick="View.signUp(this)">Pas encore membre ?</button>
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
        boxArticle.innerHTML = ( 
        articles    
        .map(article => ( /*html*/
        `
            <div class="page">
                <div id="articleWall"> 
                    <a href="./articleSeul.html">
                        <div class="articleBox">
                            <div class="infoUser marginBottom"> 
                                <p class="userName">${article.user_name}</p>                        
                                <p class="postedDate">${article.posted_date}</p>
                            </div> 
                            <div class="colorText center marginBottom">${article.title}</div>  
                            <div class="imgText" >
                                <img class="imgImport" src="./images/icon7.png" alt="">
                                <div class="justifText">${article.body}</div>    
                            </div>    
                        </div>
                    </a>                        
                </div>            
            </div>
                <div class='centerButton'>
                    <button class='goLogin' >Créer votre article </button>
                </div>
            `
            )).join('')
        );
    }
    
}