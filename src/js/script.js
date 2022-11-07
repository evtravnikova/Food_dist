import tabs from './modules/tabs';
import timer from './modules/timer';
import modal, {openModal} from './modules/modal';
import slider from './modules/slider';
import advertising from './modules/advertising';
import copytext from './modules/copytext';
import contactform from './modules/contactform';
import cards from './modules/cards';
import caloriescalc from './modules/caloriescalc';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-12-13 14:00:00');
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    advertising();
    copytext();
    contactform('form', modalTimerId);
    caloriescalc();
    cards();
})
