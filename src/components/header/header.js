import CartButton from '../cart-button'
import './header.scss'

const Header = (cart) => {
    const HeaderElement = document.createElement('header')
    HeaderElement.classList = 'header'

    const siteNameElement = document.createElement('p')
    siteNameElement.classList = 'header__site-name'
    siteNameElement.innerText = 'Вкусная Пицца!'

    const { CartButtonElement, updateCartButton } = CartButton(cart);

    HeaderElement.appendChild(siteNameElement);
    HeaderElement.appendChild(CartButtonElement);

    return { HeaderElement, updateCartButton }
}

export default Header