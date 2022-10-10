/*
class Timer {
    constructor(startTime, selector = '.timer') {
        this.startTime = startTime;
        this.timer = document.querySelector(selector);
        this.days = this.timer.querySelector('#days');
        this.hours = this.timer.querySelector('#hours');
        this.minutes = this.timer.querySelector('#minutes');
        this.seconds = this.timer.querySelector('#seconds');
        this.setClock(selector, this.startTime)
    }

    getTimeRemainder(deadline) {
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

    addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }


    setClock(selector, deadLine) {
        let f = updateClock;
        this.timeInterval = setInterval(function () {
            f(deadLine, this);
        }, 1000)


        function updateClock(deadLine, cls) {
            const timeObject = cls.getTimeRemainder(deadLine);
            cls.days.innerHTML = cls.addZero(timeObject.days);
            cls.hours.innerHTML = cls.addZero(timeObject.hours);
            cls.minutes.innerHTML = cls.addZero(timeObject.minutes);
            cls.seconds.innerHTML = cls.addZero(timeObject.seconds);

            if (cls.timer.timeToDeadline <= 0) {
                clearInterval(cls.timeInterval)
            }
        }

        updateClock(deadLine, this);


    }


}
*/
