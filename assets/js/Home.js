const $overlay = document.getElementById('overlay');
const $modal = document.getElementById('modal');
const headers = new Headers({ 'Content-Type': 'application/json' });
const notification = document.getElementById('snack');

const params = {
  method: 'GET',
  headers: headers,
};

(async () => {
  try {
    const response = await fetch('https://luiscolungaperez.com/ShopOnline/assets/data/');
    const infoCard = await response.json();
    let allData = [];


    const cardFill = (data) => {
      return `<section class='card'  data-id='${data.id}'>
          <div class='card__img'>
            <img src='${data.img}' alt='/' class='card__img--style' />
          </div>
          <div class='card__content'>
            <div class='card__content--info'>
              <h2>${data.product}</h2>
              <p>${data.description}</p>
              <h3>Price: $${data.price}</h3>
            </div>
          </div>
      </section>`;
    };
    const $content = document.querySelector('#content');

    const createTemplete = (HtmlString) => {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HtmlString;
      return html.body.children[0];
    };

    const showSnack  = () => {
      notification.classList.add('active');
      setTimeout( () => {
        notification.classList.remove('active');
      }, 2000)
    }

    const showModal = (element) => {
      const productModal = document.getElementById('productModal');
      const descriptionModal = document.getElementById('descriptionModal');
      const imgModal = document.getElementById('imgModal');
      const priceModal = document.getElementById('priceModal');
      const btnModal = document.getElementById('btn-item');

      $overlay.classList.add('active');
      $modal.classList.add('active');
      const id = element.dataset.id;
      const data = infoCard.find(item => item.id === parseInt(id, 10));
      productModal.textContent = data.product;
      descriptionModal.textContent = data.description;
      priceModal.textContent = `$ ${data.price}`;
      imgModal.setAttribute('src', data.img);
      allData = [
        ...allData,
        data
      ];
      btnModal.addEventListener('click', (event) => {
        localStorage.setItem('data', JSON.stringify(allData));
        showSnack();
        hideModal();
      })
    }

    const hideModal = () => {
      $overlay.classList.remove('active');
      $modal.classList.remove('active');
    }

    const addEventClick = ($element) => {
      const $closeButton = document.getElementById('closeButton');
      
      $element.addEventListener('click', () => {
        showModal($element);
      });

      $closeButton.addEventListener('click', () => {
        hideModal();
      });
    };
    
    infoCard.forEach((card) => {
      const HtmlString = cardFill(card);
      const cardElement = createTemplete(HtmlString);
      $content.append(cardElement);
      addEventClick(cardElement);
    });
  } catch (e) {
    const text = document.querySelector('strong');
    text.textContent = `${e}`;
    notification.classList.add('active');
    
  }
})();
