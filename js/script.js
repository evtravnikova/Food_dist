window.addEventListener('DOMContentLoaded', () => {

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

    hideTabContent();
    showTabContent();


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
    const endTime = '2022-10-10 13:11:00';

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
            const timeObject = getTimeRemainder(endTime);
            days.innerHTML = addZero(timeObject.days);
            hours.innerHTML = addZero(timeObject.hours);
            minutes.innerHTML = addZero(timeObject.minutes);
            seconds.innerHTML = addZero(timeObject.seconds);
            
            if (timer.timeToDeadline <= 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', endTime)
    console.log(new Date())
});