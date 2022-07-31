import './promocode-banner.scss'

const PromocodeBanner = () => {
    const PromocodeBannerElement = document.createElement('p');
    PromocodeBannerElement.className = 'promocode-banner';
    PromocodeBannerElement.innerText = '!!! Получи скидку 25% по Промокоду '
    
    const promocodeText = document.createElement('span');
    promocodeText.innerText = 'ХОЧУСКИДКУ'
    promocodeText.className = 'promocode-banner__code';

    PromocodeBannerElement.appendChild(promocodeText);

    PromocodeBannerElement.innerHTML += ' !!!'

    return PromocodeBannerElement
}

export default PromocodeBanner;