import ItemCart from '../item-cart';

import './cart.scss';

const Cart = (cart, changeCount, setItemPizza, order ) => {
    let promocodeSale = 1;
    let sumPrice = 0;

    const CartElement = document.createElement('div');
    CartElement.className = 'cart';
    CartElement.style.display = 'none';

    const headerCartElement = document.createElement('header');
    headerCartElement.innerText = `Корзина`;
    headerCartElement.className = 'cart__header';

    const closeButtonElement = document.createElement('button');
    closeButtonElement.classList = 'cart__close';
    closeButtonElement.innerHTML = '&#10006;';
    closeButtonElement.onclick = () => {
        CartElement.style.display = 'none';
        document.querySelector('.cart-button__cart-overlay').style.display = 'none';
    }

    const orderContainerElements  = document.createElement('div');
    orderContainerElements.classList = 'order_container';

    const orderButtonElement = document.createElement('button');
    orderButtonElement.classList = 'cart__order';
    orderButtonElement.innerHTML = 'Оформить заказ';
    orderButtonElement.onclick = () => order();
    
    const promocodeInputElement = document.createElement('input');
    promocodeInputElement.classList = 'cart__promocode-input';
    promocodeInputElement.setAttribute('type', 'text');
    promocodeInputElement.setAttribute('placeholder', 'Промокод');
    promocodeInputElement.oninput = () => {
        promocodeInputElement.value = promocodeInputElement.value.toUpperCase();
        if(promocodeInputElement.value === 'ХОЧУСКИДКУ') {
            promocodeSale = 0.75;
        } else {
            promocodeSale = 1;
        }
        priceElement.innerText = `Сумма заказа: ${sumPrice*promocodeSale}`;
    }

    const mainCartElement = document.createElement('main');
    mainCartElement.className = 'cart__main';

    const emptyCartElement = document.createElement('div')
    emptyCartElement.innerText = 'Корзина пуста';
    emptyCartElement.className = 'cart__empty';

    const footerCartElement = document.createElement('footer');
    footerCartElement.className = 'cart__footer';

    const itemsCountElement = document.createElement('p');
    itemsCountElement.innerText = `Кол-во товаров: ${cart.length}`;
    itemsCountElement.className = 'cart__count';

    const priceElement = document.createElement('p');
    priceElement.innerText = 'Сумма заказа: 0';
    priceElement.className = 'cart__price';

    headerCartElement.appendChild(closeButtonElement);

    mainCartElement.appendChild(emptyCartElement);

    orderContainerElements.appendChild(promocodeInputElement);
    orderContainerElements.appendChild(orderButtonElement);
    footerCartElement.appendChild(itemsCountElement);
    footerCartElement.appendChild(priceElement);
    //footerCartElement.appendChild(promocodeInputElement);
    //footerCartElement.appendChild(orderButtonElement);
    footerCartElement.appendChild(orderContainerElements);

    CartElement.appendChild(headerCartElement);
    CartElement.appendChild(mainCartElement);
    CartElement.appendChild(footerCartElement);

    const newSetCart = new Set();

    const generateCartItems = (setCart) => {
        setCart.forEach(item => {
            const onAdd = () => changeCount(item, cart, true, { e: ItemCartElement, f: updateItemCart });

            const onSubtract = () => changeCount(item, cart, false, { e: ItemCartElement, f: updateItemCart });
            const { ItemCartElement, updateItemCart } = ItemCart(item.name, item.price, onAdd, onSubtract);

            if (!newSetCart.has(item)) {
                newSetCart.add(item)

                mainCartElement.appendChild(ItemCartElement);
                setItemPizza.add({ e: ItemCartElement, f: updateItemCart });
                updateItemCart(cart.filter(itemFilter => itemFilter.id === item.id).length)
            }
        })
    }

    const updateCart = (newCart, itemName, pizza) => {
        itemsCountElement.innerText = `Кол-во товаров: ${newCart.length}`;

        sumPrice = newCart.reduce((sum, item) => sum + item.price, 0)*promocodeSale;
        priceElement.innerText = `Сумма заказа: ${sumPrice}`;

        const setCart = new Set(newCart);

        if (newCart.length !== 0) {
            emptyCartElement.remove();
        } else {
            mainCartElement.appendChild(emptyCartElement);
        }

        let itemElement = document.querySelectorAll('.item__name');
        itemElement.forEach(item => {
            if (item.textContent == itemName) {
                let idElement = pizza.filter(i => i.name === item.textContent)[0].id;
                let countElement = cart.filter(itemFilter => itemFilter.id === idElement).length;
                setItemPizza.forEach(itemSet => {
                    if (itemSet.e == item.parentElement) {
                        itemSet.f(countElement);
                    }
                })
            }
        })

        let itemCartElement = document.querySelectorAll('.item-cart__name');
        itemCartElement.forEach(item => {
            if (item.textContent == itemName) {
                let idElement = pizza.filter(i => i.name === item.textContent)[0].id;
                let countElement = cart.filter(itemFilter => itemFilter.id === idElement).length;
                setItemPizza.forEach(itemSet => {
                    if (itemSet.e == item.parentElement) {
                        itemSet.f(countElement);
                    }
                })
                if (countElement == 0) {
                    item.parentElement.remove();
                    let removedSetItem;
                    newSetCart.forEach(itemSet => {
                        if (itemSet.name === item.textContent) {
                            removedSetItem = itemSet;
                        }
                    })
                    newSetCart.delete(removedSetItem);
                }
            }
        })

        generateCartItems(setCart);
    }

    return { CartElement, updateCart };
};

export default Cart;