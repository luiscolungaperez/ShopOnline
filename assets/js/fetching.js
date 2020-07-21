const headers = new Headers({ "Content-Type": "application/json" });

const params = {
  method: "GET",
  headers: headers,
};

(async () => {
  try {
    const response = await fetch("../../items.json");
    const infoCard = await response.json();

    const cardFill = (data) => {
      return `<section class="card" key="${data.id}">
          <div class="card__img">
            <img src="${data.img}" alt="/" class="card__img--style" />
          </div>
          <div class="card__content">
            <div class="card__content--info">
              <h2>${data.name}</h2>
              <p>${data.description}</p>
              <h3>Price: $${data.price}</h3>
            </div>
          </div>
      </section>`;
    };
    const $content = document.querySelector("#content");

    const createTemplete = (HtmlString) => {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HtmlString;
      return html.body.children[0];
    };

    const addEventClick = ($element) => {
      const $overlay = document.getElementById("overlay");
      const $modal = document.getElementById("modal");
      const $closeButton = document.getElementById("closeButton");
      const $btn = document.querySelector("#cardButton__1");
      //   console.log($);

      $element.addEventListener("click", () => {
        $overlay.classList.add("active");
        $modal.classList.add("active");
      });
      $closeButton.addEventListener("click", () => {
        $overlay.classList.remove("active");
        $modal.classList.remove("active");
      });
    };
    infoCard.forEach((card) => {
      const HtmlString = cardFill(card);
      const cardElement = createTemplete(HtmlString);
      $content.append(cardElement);
      addEventClick(cardElement);
    });
  } catch (e) {
    console.log(e);
  }
})();
