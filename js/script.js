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

gear.addEventListener('click', function () {
  saw.classList.remove('driving');
  void saw.offsetWidth;    // сброс анимации
  saw.classList.add('driving');
});



// Кнопка "узнать стоимость"
const banner = document.querySelector('#price-banner');

document.querySelector('#price-btn').addEventListener('click', function () {
  banner.classList.add('shown');
});

document.querySelector('#price-close').addEventListener('click', function () {
  banner.classList.remove('shown');
});