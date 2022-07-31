import './filter-pizza.scss'

const FilterPizza = (tag, onFilter) => {

    let FilterPizzaElement = document.createElement('button');
    FilterPizzaElement.className = 'filter-pizza';
    FilterPizzaElement.textContent = tag;

    FilterPizzaElement.onclick = onFilter;

    return FilterPizzaElement;
}

export default FilterPizza;