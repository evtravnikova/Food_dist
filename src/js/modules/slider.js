function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider
    function changeSlideImg() {
        let offset = 0;
        let slideIndex = 1;

        const slides = document.querySelectorAll(slide),
            slider = document.querySelector(container),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalCounter),
            current = document.querySelector(currentCounter),
            slidesWrapper = document.querySelector(wrapper),
            width = window.getComputedStyle(slidesWrapper).width,
            slidesField = document.querySelector(field);

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

    }

    changeSlideImg();
}

export default slider;