window.addEventListener('DOMContentLoaded', () => {
    hideTabContent();
    showTabContent();
    const endTime = '2022-10-13 14:00:00';
    setClock('.timer', endTime);
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
        'timeToDeadline': timeToDeadline, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds
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
const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === "") {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

const modalTimerId = setTimeout(openModal, 300000);


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
class Card {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.course = 40;
        this.fromUSDToUAH();
    }

    fromUSDToUAH() {
        this.price = +this.price * this.course
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0) {
            element.classList.add("menu__item")
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        `
        this.parent.append(element);
    }
}

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw Error(`Couldn't fetch ${url}, status ${res.status}`);
    }
    return res.json();
};
getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        })
    });
/*
getResource('http://localhost:3000/menu')
    .then(data => createCard(data));

function createCard(data) {
    data.forEach(({img, altimg, title, descr, price}) => {
        price = price * 40;
        const element = document.createElement('div');
        element.classList.add('menu__item');
        element.innerHTML = `
        <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
        `;
        document.querySelector('.menu .container').append(element);
    })
}
*/

//Contact forms
const forms = document.querySelectorAll('form');
const msgs = {
    loading: 'img/form/spinner.svg', success: 'Спасибо, скоро свяжемся с вами!', failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: data
    });
    return res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = msgs.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;`;
            form.insertAdjacentElement("afterend", statusMessage);
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(msgs.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(msgs.failure);
                })
                .finally(() => {
                    form.reset();
                })
        }
    )
    ;
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `<div class="modal__content">
        <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
        </div>`;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
