import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  console.log(article);

  if (formIsValide(article)) {
    const json = JSON.stringify(article);
    try {
      const response = await fetch("https://restapi.fr/api/test", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      console.log(body);
      alert("Votre article est en ligne");
      formIsSave();
    } catch (err) {
      console.log(err);
    }
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
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};

const formIsSave = () => {
  errorElement.innerHTML = `<li>Article sauvegarder</li>`;
};
