import ItemImg from '../../assets/img/item.png'
import Range from '../range';

import './item-cart.scss';

const ItemCart = ( name, price, onAdd, onSubtract ) => {
    const ItemCartElement = document.createElement( 'div' );
    ItemCartElement.className = 'item-cart';

    const nameElement =  document.createElement( 'span' );
    nameElement.className = 'item-cart__name';
    nameElement.innerText = name;

    const priceElement =  document.createElement( 'span' );
    priceElement.className = 'item-cart__price';
    priceElement.innerText = `${price}`;

    const imageElement =  document.createElement( 'img' );
    imageElement.src = ItemImg;
    imageElement.className = 'item-cart__image';

    const { RangeElement, updateRange } = Range( onAdd, onSubtract);

    ItemCartElement.appendChild( imageElement );
    ItemCartElement.appendChild( nameElement );
    ItemCartElement.appendChild( priceElement );
    ItemCartElement.appendChild( RangeElement );


    const updateItemCart = ( count = 0 ) => {
        
        updateRange( count );
        priceElement.innerText = `${price*count}`;

    }

    return { ItemCartElement, updateItemCart };
}

export default ItemCart;