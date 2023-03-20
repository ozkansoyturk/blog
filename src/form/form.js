import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  for (const pair of formData) {
    // console.log(pair[0]);
  }
});
