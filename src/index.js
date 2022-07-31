import Header from "./components/header/header";
import FilterSection from "./components/filter-section";
import Sorting from "./components/sorting";
import FilterPizza from "./components/filter-pizza";
import FilterPizzaList from "./components/filter-pizza-list";
import ItemsList from "./components/items-list";
import Item from "./components/item";
import Cart from "./components/cart";
import PromocodeBanner from "./components/promocode-banner";

import './index.scss';
import 'normalize.css';

let defaultPizza = []
let pizza = []
let cart = [];
let activeTag = null;

const setItemPizza = new Set();
const setTagPizza = new Set();

const filterSection = FilterSection();
const filterPizzaList = FilterPizzaList();
const sorting = Sorting();
const itemsList = ItemsList();
const promocodeBanner = PromocodeBanner();

sorting.onchange = () => changePizzaArray();

const changePizzaArray = () => {
        switch (sorting.value) {
            case ('Дешевле'):
                console.log([...defaultPizza].sort((prev, next) => prev.price - next.price));
                pizza = [...defaultPizza].sort((prev, next) => prev.price - next.price);
                console.log(pizza);
                generateItems();
                break;

            case ('Дороже'):
                pizza = [...defaultPizza].sort((prev, next) => next.price - prev.price);
                generateItems();
                break;

            default:
                pizza = [...defaultPizza];
                generateItems();
        }

        switch (activeTag) {
            case ([...setTagPizza][0]):
                pizza = pizza.filter(item => item.tag == [...setTagPizza][0]);
                generateItems();
                break;

            case ([...setTagPizza][1]):
                pizza = pizza.filter(item => item.tag == [...setTagPizza][1]);
                generateItems();
                break;

            case ([...setTagPizza][2]):
                pizza = pizza.filter(item => item.tag == [...setTagPizza][2]);
                generateItems();
                break;

            case ([...setTagPizza][3]):
                pizza = pizza.filter(item => item.tag == [...setTagPizza][3]);
                generateItems();
                break;
        }
}

const changeTag = function (item, filterPizza) {
    document.querySelector('.filter-pizza.filter-pizza--active')?.classList.remove('filter-pizza--active');

    if (activeTag === item) {
        activeTag = null;
    } else {
        activeTag = item;
        filterPizza.classList.add('filter-pizza--active')
    }

    changePizzaArray()
}

const generateTag = () => {
    setTagPizza.forEach(item => {
        const onFilter = () => changeTag(item, filterPizza)
        const filterPizza = FilterPizza(item, onFilter);
        filterPizzaList.appendChild(filterPizza);
    })
}

const changeCount = function (item, cart, isAdd) {
    if (isAdd) {
        cart.push(item);
    } else {
        cart.splice(cart.findIndex(itemFind => itemFind.id === item.id), 1);
    }

    updateCart(cart, item.name, defaultPizza);
    updateCartButton(cart.length);
}

const order = () => {
    CartElement.style.display = 'none';
    document.querySelector('.cart-button__cart-overlay').style.display = 'none';
    cart = [];
    updateCartButton(cart.length);
    generateItems();
}

const { CartElement, updateCart } = Cart(cart, changeCount, setItemPizza, order);
const { HeaderElement, updateCartButton } = Header(CartElement);


const generateItems = () => {
    if (itemsList.children) {
        itemsList.replaceChildren();
    }

    pizza.forEach((item) => {
        const onAdd = () => changeCount(item, cart, true);

        const onSubtract = () => changeCount(item, cart, false);

        const { ItemElement, updateItem } = Item(item.name, item.price, item.tag, item.ingredients, onAdd, onSubtract);
        itemsList.appendChild(ItemElement);
        updateItem(cart.filter(itemFilter => itemFilter.id === item.id).length);
        setItemPizza.add({ e: ItemElement, f: updateItem });
    })

    if (filterPizzaList.childElementCount === 0) {
        defaultPizza.forEach(item => {
            if (item.tag !== '') {
                setTagPizza.add(item.tag);
            }
        })
        generateTag();
    }
}

async function loadData() {
    let response = await fetch(`./data.json`);
    let data = await response.json();
    defaultPizza = [...data];
    pizza = [...data];

    generateItems();

    return data;
}

loadData()

document.body.appendChild(HeaderElement);
document.body.append(filterSection)
filterSection.append(sorting);
filterSection.append(filterPizzaList);
document.body.append(promocodeBanner)
document.body.appendChild(itemsList);
document.body.appendChild(CartElement);