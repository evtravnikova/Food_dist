window.addEventListener('DOMContentLoaded', () => {
        const tabs = require('./modules/tabs'),
            timer = require('./modules/timer'),
            modal = require('./modules/modal'),
            slider = require('./modules/slider'),
            advertising = require('./modules/advertising'),
            copytext = require('./modules/copytext'),
            contactform = require('./modules/contactform'),
            cards = require('./modules/cards'),
            caloriescalc = require('./modules/caloriescalc');

        tabs();
        timer();
        modal();
        slider();
        advertising();
        copytext();
        contactform();
        caloriescalc();
        cards();

})
