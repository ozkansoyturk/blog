import "./assets/styles/styles.scss";
import "./index.scss";
import { openModal } from "./assets/javascripts/modal";

const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");
const selectElement = document.querySelector("select");
let filter;
let articles;
let sortBy = "desc";

selectElement.addEventListener("change", () => {
  sortBy = selectElement.value;
  fetchArticles();
});

const createArticles = () => {
  const articlesDOM = articles
    .filter((article) => {
      if (filter) {
        return article.category === filter;
      } else {
        return true;
      }
    })
    .map((article) => {
      const articleDOM = document.createElement("div");
      articleDOM.classList.add("article");
      articleDOM.innerHTML = `
<h2>${article.title}</h2>
<p class="article-author">${article.author} - ${new Date(
        article.createdAt
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}</p>
<p class="article-content">${article.content}</p>
<div class="article-actions">
    <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
    <button class="btn btn-primary" data-id=${article._id}>Modifier</button>
</div>
`;
      return articleDOM;
    });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);

  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articleContainerElement.querySelectorAll(".btn-primary");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${articleId}`);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      openModal("Etes vous sûr de vouloir supprimer votre article ?");
      // try {
      //   const target = event.target;
      //   const articleId = target.dataset.id;
      //   const response = await fetch(
      //     `https://restapi.fr/api/article/${articleId}`,
      //     {
      //       method: "DELETE"
      //     }
      //   );
      //   const body = await response.json();
      //   console.log(body);
      //   fetchArticle();
      // } catch (e) {
      //   console.log("e : ", e);
      // }
    });
  });
};

const displayMenuCategories = (categoriesArr) => {
  const liElements = categoriesArr.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem[0]} ( <strong>${categoryElem[1]}</strong> )`;
    if (categoryElem[0] === filter) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      if (filter === categoryElem[0]) {
        filter = null;
        li.classList.remove("active");
        createArticles();
      } else {
        filter = categoryElem[0];
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        createArticles();
      }
    });
    return li;
  });

  categoriesContainerElement.innerHTML = "";
  categoriesContainerElement.append(...liElements);
};

const createCategories = () => {
  const categories = articles.reduce((acc, curr) => {
    if (acc[curr.category]) {
      acc[curr.category]++;
    } else {
      acc[curr.category] = 1;
    }
    return acc;
  }, {});

  const categoriesArr = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((c1, c2) => c1[0].localeCompare(c2[0]));
  displayMenuCategories(categoriesArr);
};

const fetchArticles = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/ok?sort=createdAt:${sortBy}`
    );
    articles = await response.json();

    // Restapi retourne un objet s'il n'y a qu'un seul article
    // nous devons donc le transformer en tableau :
    if (!Array.isArray(articles)) {
      articles = [articles];
    }

    createArticles();
    createCategories();
  } catch (error) {
    console.log(error);
  }
};

fetchArticles();
