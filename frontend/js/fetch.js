let articles; 

const fetchArticles = async () => {
articles = await fetch("http://localhost:5500/api/article")
.then(res => res.json());
console.log(articles)
}

fetchArticles();

