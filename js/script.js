window.addEventListener('DOMContentLoaded', () => {
    hideTabContent();
    showTabContent();
    const endTime = '2022-10-13 14:00:00';
    setClock('.timer', endTime);
    changeSlideImg();
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
/*getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        })
    });*/

axios.get('http://localhost:3000/menu')
    .then(data => {
        console.warn(data)
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        })
    })

//Contact forms
const forms = document.querySelectorAll('form');
const msgs = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, скоро свяжемся с вами!',
    failure: 'Что-то пошло не так...'
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

//slider
function changeSlideImg() {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slideIndex < 10 && slides.length < 10) {
        total.textContent = `/0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }
    if (slideIndex < 10 && slides.length >= 10) {
        total.textContent = `/${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } /*else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }*/

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {
        if (offset === (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotsOpacity();
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            dotsOpacity();
        })
    })

    function dotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    //Calories calculator
    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height,
        weight,
        age,
        ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '...';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toString();
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toString();
        }
    }

    calcTotal();

    function getStaticData(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
            } else {
                sex = e.target.getAttribute('id');
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            
            calcTotal();
        })
        })
    }

    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicData(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');
}

