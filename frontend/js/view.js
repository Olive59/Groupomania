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
                <a href="index.html"><img src="images/logoMid.png" alt="logo de groupomania"></a>
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
                
                <h2>Créer un compte</h2>
              
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
                <input type="submit" value="Entrer" />
            </form>
            <a href="articleSeul.html">Article</a>
        </div>
        </div> 

       `;
       
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
        boxArticle.innerHTML = /*html*/
        `
            <div class="page">
                <div id="articleWall">
                    <a href="integration/articleSeul.html">
                    <div class="articleBox">
                        <div>
                            <div class="infoUser marginBottom">   
                                <img src="2.png" alt="">
                                <p>Olivier</p>                            
                                <p>il y a 20 minutes      
                                </p>
                            </div>    
                        </div>
                        <div class="colorText center marginBottom">titre</div>
                        <div class="imageText">
                            <img class="imgImport" src="images/icon7.png" alt="">
                            <div class="justifText"> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Quisquam esse, aspernatur neque vel temporibus harum tempore unde culpa,
                            minus vitae deserunt laborum? Nulla provident obcaecati in nihil officia
                            sequi adipisci.
                            </div>                    
                        </div>
                    </div>
                </a>
            </div>
        </div>
    `
    }
    
}