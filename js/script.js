window.addEventListener('DOMContentLoaded', () => {
    hideTabContent();
    showTabContent();
    const endTime = '2022-10-13 14:00:00';
    setClock('.timer', endTime);
    showModalWindow();
    //fuckingAdv();
    //copyOff()
});


//Tabs
const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active')
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active')
}

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target === item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});


//Timer

function getTimeRemainder(deadline) {
    let days, hours, minutes, seconds;
    const timeToDeadline = Date.parse(deadline) - Date.parse(new Date());

    if (timeToDeadline <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0
    } else {
        days = Math.floor(timeToDeadline / (1000 * 60 * 60 * 24));
        hours = Math.floor(timeToDeadline / (1000 * 60 * 60) % 24);
        minutes = Math.floor(timeToDeadline / (1000 * 60) % 60);
        seconds = Math.floor((timeToDeadline / 1000) % 60);
    }
    return {
        'timeToDeadline': timeToDeadline,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

function addZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`
    } else {
        return num
    }
}

function setClock(selector, deadLine) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000)

    updateClock();

    function updateClock() {
        const timeObject = getTimeRemainder(deadLine);
        days.innerHTML = addZero(timeObject.days);
        hours.innerHTML = addZero(timeObject.hours);
        minutes.innerHTML = addZero(timeObject.minutes);
        seconds.innerHTML = addZero(timeObject.seconds);

        if (timer.timeToDeadline <= 0) {
            clearInterval(timeInterval)
        }
    }
}

//Modal window
function showModalWindow() {
    const btns = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtns = document.querySelector('[data-close]');
    const modalTimerId = setTimeout(openModal, 100000);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', openModal)
    }

    modalCloseBtns.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal && modal.classList.contains('show')) {
            closeModal()
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId)
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}


//Fucking Vinted advertising
function fuckingAdv() {
    window.addEventListener('click', () => {
        window.open('https://www.vinted.pl/')
    }, {once: true})
}

//text copying is prohibited
function copyOff() {
    document.addEventListener('copy', (event) => {
        console.log(event)
        event.clipboardData.setData("text/plain", "nononono :P");
        event.preventDefault()
    }, false);
}

//classes for cards
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 40;
        this.changeToUAH()

    }
    changeToUAH() {
       this.price = +this.price * this.transfer
    }
    render() {
        const element = document.createElement('div');
        element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
        `;
        this.parent.append(element);
    }
}
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню Фитнес",
    "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это новый продукт с оптимальной ценой и высоким качеством!",
    16,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню Премиум",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
).render();


new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню Постное",
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    18,
    ".menu .container"
).render();




