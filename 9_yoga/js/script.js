window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    // timer

    let deadline = '2020-05-11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60), // получаем от деления на 60 остаток секунд
            minutes = Math.floor((t / 1000 / 60) % 60), // получаем минуты
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // modal

    let more = document.querySelector('.more'),
        moreDetailed = document.getElementsByClassName('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        btnPopupBlock = document.querySelector('.content');

    btnPopupBlock.addEventListener('click', function (event) {
        if (event.target && event.target.className == 'more' || event.target.className == 'description-btn') {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });


    /* more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; //запрещает прокрутку страницы при закрытии мод. окна
    }); */

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };


    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) { //ОБЯЗАТЕЛЬНО вешаем обработчик на ФОРМУ!
        event.preventDefault(); // отменяем перезагрузку страницы при нажатии на кнопку
        form.appendChild(statusMessage); // добавляем новый div status 

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php'); // настраиваем запрос
        /* request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // для отправки данных в обычном формате (не JSON) */
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); // для отправки данных в JSON формате

        let formData = new FormData(form); // внутри лежат данные, которые вввел пользователь

        let obj = {}; // обьект для помещения пользовательских данных

        formData.forEach(function(value, key){ 
            obj[key] = value;
        });
        let json = JSON.stringify(obj); // преобразуем все данные в формат JSON

        /* request.send(formData); */
        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) { // очистка поля ввода после отправки данных
            input[i].value = '';
        }
    });


    // Slider

    let slideIndex = 1, // параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1; // пролистывание от последнего к первому
        }
        if (n < 1) {
            slideIndex = slides.length; // пролистывание назад ( от первого к последнему)
        }

        slides.forEach((item) => item.style.display = 'none'); // скрываем все слайды


        /* for (let i = 0; i < slides.length; i++) { // аналог верхней функции
            slides[i].style.display = 'none';
        } */
        dots.forEach((item) => item.classList.remove('dot-active')); // убираем класс активности с точек

        slides[slideIndex - 1].style.display = 'block'; // отображаем 1й слайд
        dots[slideIndex - 1].classList.add('dot-active'); // и соответственно 1ю точку делаем активной
    }

    function plusSlides(n) { // будет изменять наш индекс в зависимости от того, в какуб сторону идём
        showSlides(slideIndex += n); // сразу вызываем функцию показа слайда с новым аргументом
    }
    function currentSlide(n) { // определяет текущий слайд и устанавливает его
        showSlides(slideIndex = n);
    } 

    prev.addEventListener('click', function() {
        plusSlides(-1); // листаем назад, -1 - аргумент для уменьшения slideIndex
    });
    next.addEventListener('click', function () {
        plusSlides(1); // листаем вперед
    });

    dotsWrap.addEventListener('click', function(event) { // используем делегирование
        for (let i = 0; i < dots.length + 1; i++) { // +1 для того, чтобы цикл сделал на 1 итерацию больше, т.к. точек\слайдов 4, а номер индекса макс. 3
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) { // [i-1] - при клике на 4ю точку - отображается точка с индексом 3
                currentSlide(i);
            }
        }
    });

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daySum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value; // получаем value у инпута, на котором происходит событие
            total = (daySum + personsSum)*4000;
            
            if (restDays.value == '') { // если не заполнено поле с днями, то общая сумма равна 0
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value; // получаем value у инпута, на котором происходит событие
            total = (daySum + personsSum)*4000;
            
            if (persons.value == '') { // если не заполнено поле с днями, то общая сумма равна 0
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });
});