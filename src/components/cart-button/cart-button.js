import './cart-button.scss';

const CartButton = (cart) => {
    const CartButtonElement = document.createElement('button');
    CartButtonElement.classList = 'cart-button';
    CartButtonElement.innerText = 'Корзина';
    CartButtonElement.onclick = () => {
        cart.style.display = 'flex';
        cartOverlayElement.style.display = 'block'
    };

    const cartOverlayElement = document.createElement('div');
    cartOverlayElement.classList = 'cart-button__cart-overlay';
    cartOverlayElement.style.display = 'none';
    cartOverlayElement.onclick = () => {
        cart.style.display = 'none';
        cartOverlayElement.style.display = 'none';
    };

    const cartCountElement = document.createElement('span');
    cartCountElement.classList = 'cart-button__count';
    cartCountElement.style.display = 'none';

    CartButtonElement.appendChild(cartCountElement);
    document.body.appendChild(cartOverlayElement);

    const updateCartButton = ( count = 0 ) => {
        if( count !== 0 ) {
            cartCountElement.style.display = 'inline-block';
            cartCountElement.innerText = ` | ${count}`;
        } else {
            cartCountElement.style.display = 'none';
        }
    }

    return { CartButtonElement, updateCartButton };
}

export default CartButton;