import './range.scss';

const Range = ( onAdd, onSubtract ) => {

    const RangeElement = document.createElement( 'div' );
    RangeElement.className = 'range';

    const RangeSubtractElement = document.createElement( 'button' );
    RangeSubtractElement.className = 'range__subtract';
    RangeSubtractElement.innerText = '-';
    RangeSubtractElement.addEventListener( 'click', onSubtract )

    const RangeCountElement = document.createElement( 'span' );
    RangeCountElement.className = 'range__count';
    RangeCountElement.innerText = 'Кол-во: 0';

    const RangeAddElement = document.createElement( 'button' );
    RangeAddElement.className = 'range__add';
    RangeAddElement.innerText = '+';
    RangeAddElement.addEventListener( 'click', onAdd )

    RangeElement.appendChild( RangeSubtractElement )
    RangeElement.appendChild( RangeCountElement )
    RangeElement.appendChild( RangeAddElement )

    const updateRange = ( count = 0 ) => {
        RangeCountElement.innerText = `Кол-во: ${count}`;
    }

    return { RangeElement, updateRange};
}

export default Range;