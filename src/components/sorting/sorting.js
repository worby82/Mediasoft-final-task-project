import './sorting.scss'

const Sorting = () => {
    const SortingElement = document.createElement('select');
    SortingElement.className = 'sorting';

    [ 'По умолчанию', 'Дешевле', 'Дороже' ].forEach(item => {
        let optionSortingElement = document.createElement('option');
        optionSortingElement.className = 'sorting__option';
        optionSortingElement.textContent = item;
        optionSortingElement.value = item;

        SortingElement.appendChild(optionSortingElement);
    })

    return SortingElement;
}

export default Sorting;