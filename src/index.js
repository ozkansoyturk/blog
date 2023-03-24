import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");

const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
<img
    src="${article.img}"
    alt="profile"
/>
<h2>${article.title}</h2>
<p class="article-author">${article.author} - ${article.category}</p>
<p class="article-content">${article.content}</p>
<div class="article-actions">
    <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
</div>
`;
    return articleDOM;
  });
  console.log(articlesDOM);
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      try {
        const response = await fetch(`https://restapi.fr/api/ok/${articleId}`, {
          method: "DELETE",
        });
        const body = await response.json();
        console.log(body);
        fetchArticles();
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/ok");
    let articles = await response.json();
    console.log(articles);
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    createArticles(articles);
  } catch (error) {
    console.log(error);
  }
};

fetchArticles();
