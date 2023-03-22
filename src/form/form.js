import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValide(article)) {
    const json = JSON.stringify(article);
    // fetch
  }
});

const formIsValide = (article) => {
  if (!article.author || !article.category || !article.content) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }

  if (errors.length) {
    let errorHtml = "";
    errors.forEach((e) => {
      errorHtml += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHtml;
  } else {
    errorElement.innerHTML = "";
  }
};
