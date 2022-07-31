import ItemImg from '../../assets/img/item.png'
import Range from '../range';

import './item.scss';

const Item = ( name, price, tag, ingredients, onAdd, onSubtract ) => {
    const ItemElement = document.createElement( 'div' );
    ItemElement.className = 'item';

    const tagElement =  document.createElement( 'p' );
    tagElement.className = 'item__tag';
    tagElement.innerText = `${tag}`;

    const imageElement =  document.createElement( 'img' );
    imageElement.src = ItemImg;
    imageElement.className = 'item__image';

    const nameElement =  document.createElement( 'p' );
    nameElement.className = 'item__name';
    nameElement.innerText = name;

    const ingredientsElement =  document.createElement( 'p' );
    ingredientsElement.className = 'item__ingredients';
    ingredientsElement.innerText = `${ingredients}`;

    const priceElement =  document.createElement( 'p' );
    priceElement.className = 'item__price';
    priceElement.innerText = `Цена: ${price}`;

    const buttonElement =  document.createElement( 'button' );
    buttonElement.className = 'item__add-button';
    buttonElement.innerText = 'Добавить';
    buttonElement.addEventListener( 'click', onAdd )

    const { RangeElement, updateRange } = Range( onAdd, onSubtract);

    if(tag) {
        ItemElement.appendChild( tagElement )
    }
    ItemElement.appendChild( imageElement )
    ItemElement.appendChild( nameElement )
    ItemElement.appendChild( ingredientsElement )
    ItemElement.appendChild( priceElement )
    ItemElement.appendChild( buttonElement )


    const updateItem = ( count = 0 ) => {
        
        updateRange( count );

        if( count !== 0 ) {
            buttonElement.replaceWith(RangeElement);
        } else {
            RangeElement.replaceWith(buttonElement);
        }

    }

    return { ItemElement, updateItem};
}

export default Item;