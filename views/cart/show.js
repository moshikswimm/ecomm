const layout = require('../layout');

module.exports = ({ items }) => {
    const total = Object.values(items).reduce((prev, item) => {
        return prev + item.quantity * item.product.price
    }, 0)

  const renderedItems = Object.keys(items).map(key => {
      return `
        <div class="cart-item message">
          <h3 class="subtitle">${items[key].product.title}</h3>
          <div class="cart-right">
            <div>
              $${items[key].product.price}  X  ${items[key].quantity} = 
            </div>
            <div class="price is-size-4">
              $${items[key].product.price * items[key].quantity}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/products/delete">
                <input hidden value="${key}" name="deleteId" />
                <button class="button is-danger">                  
                  < class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return layout({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 class="title">$${total}</h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `
  });
};
