// Автопролистывание адаптивной графики
const slider = document.querySelector('.slider');
const total = slider.children.length;   // количество плиток

let current = 0;
let timer;

function next() {
  current = (current + 1) % total;      // 0 → 1 → 2 → 0 → ...
  slider.scrollTo({
    left: current * slider.clientWidth, // на ширину одной плитки
    behavior: 'smooth'
  });
}

function start() {
  timer = setInterval(next, 3000);
}

start();

// Пауза, пока курсор над слайдером
slider.addEventListener('mouseenter', function () {
  clearInterval(timer);
});
slider.addEventListener('mouseleave', function () {
  start();
});



// Сокрытие подсказки
const hint = document.querySelector('.scroll-hint');

window.addEventListener('scroll', function () {
  hint.classList.toggle('hidden', window.scrollY > 100);
});





// Просмотр изображений
const viewer = document.querySelector('#viewer');
const viewerImg = document.querySelector('#viewer-img');

document.querySelectorAll('.gallery img').forEach(function (img) {
  img.addEventListener('click', function () {
    viewerImg.src = img.src;     // подставляем адрес нажатой картинки
    viewerImg.alt = img.alt;
    viewer.showModal();          // открываем окно
  });
});

viewer.addEventListener('click', function () {
  viewer.close();                // клик по любой точке — закрыть
});


// Анимация пилы
const saw = document.querySelector('#saw');
const gear = document.querySelector('.gear-click');

if (saw && gear) {
  gear.addEventListener('click', function () {
    saw.classList.remove('driving');

    // Перезапуск анимации с самого начала
    void saw.offsetWidth;

    saw.classList.add('driving');
  });

  saw.addEventListener('animationend', function (event) {
    if (event.target === saw) {
      saw.classList.remove('driving');
    }
  });
}

gear.addEventListener('click', function () {
  // Если анимация уже шла, перезапускаем её с начала.
  saw.classList.remove('driving');
  saw.style.animation = 'none';
  saw.style.transform = '';
  void saw.offsetWidth;

  // Выбираем траекторию один раз. Изменение масштаба/ширины окна
  // во время движения не переключит keyframes и не запустит её заново.
  const mobile = window.matchMedia('(max-width: 700px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (mobile) {
    saw.style.animation = reducedMotion
      ? 'drive-mobile 1.8s ease-in-out 1 forwards'
      : 'drive-mobile 3.2s ease-in-out 1 forwards';
  } else {
    saw.style.animation = reducedMotion
      ? 'drive 1.8s linear 1 forwards'
      : 'drive 3s linear 1 forwards';
  }

  saw.classList.add('driving');
});

saw.addEventListener('animationend', finishSawAnimation);
saw.addEventListener('animationcancel', finishSawAnimation);


// Кнопка "узнать стоимость"
const banner = document.querySelector('#price-banner');

document.querySelector('#price-btn').addEventListener('click', function () {
  banner.classList.add('shown');
});

document.querySelector('#price-close').addEventListener('click', function () {
  banner.classList.remove('shown');
});