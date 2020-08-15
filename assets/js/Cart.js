(() => {
  const allData = JSON.parse(localStorage.getItem('data'));
  const $content__card = document.getElementById('content__cards');
  let subtotal = 0;

  const itemFill = (item) => {
    return `<section class='item' data-id='${item.id}'>
      <img src='${item.img}' alt='${item.product}' class='item__img' />
      <div class='item__content'>
        <h3 class='item__content--title'>${item.product}</h3>
        <p class='item__content--description'>${item.description}</p>
        <p class='item__content--price'>Price: $ ${item.price}</p>
      </div>
    </section>`
  }

  const withOutItems = () => {
    return `<section class='item'>
      <h4>No hay producto seleccionados</h4>
    </section>`
  }

  const createItem = (HtmlString) => {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HtmlString;
    return html.body.children[0];
  }

  const infoPay = () => {
    const $subtotal = document.getElementById('subtotal');
    const $iva = document.getElementById('iva');
    const $total = document.getElementById('total');

    $subtotal.textContent = `Subtotal: $ ${(subtotal).toFixed(2)}`;
    $iva.textContent = `Iva: $ ${(subtotal * 0.16).toFixed(2)}`;
    $total.textContent = `Total: $ ${(subtotal + (subtotal * 0.16)).toFixed(2)}`;
  }


  if(localStorage.length === 0){
    subtotal = 0;
    const HtmlString = withOutItems();
    const itemElement = createItem(HtmlString);
    $content__card.append(itemElement);
    infoPay();
  }else{
    allData.forEach(element => {
    subtotal += element.price;
    const HtmlString = itemFill(element);
    const itemElement = createItem(HtmlString);
    $content__card.append(itemElement);
    infoPay();
    });
  }
})();

const clearShop = () => {
  localStorage.clear();
  location.reload();
}