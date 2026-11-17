// Автопролистывание плиток-статистики
const slider = document.querySelector('.slider');
const total = slider.children.length;

let current = 0;
let timer;

function next() {
  current = (current + 1) % total;
  slider.scrollTo({
    left: current * slider.clientWidth,
    behavior: 'smooth'
  });
}

function start() {
  timer = setInterval(next, 3000);
}

start();

slider.addEventListener('mouseenter', function () {
  clearInterval(timer);
});
slider.addEventListener('mouseleave', function () {
  start();
});


// Сокрытие подсказки при прокрутке
const hint = document.querySelector('.scroll-hint');

window.addEventListener('scroll', function () {
  hint.classList.toggle('hidden', window.scrollY > 100);
});


// Просмотр изображений галереи
const viewer = document.querySelector('#viewer');
const viewerImg = document.querySelector('#viewer-img');

document.querySelectorAll('.gallery img').forEach(function (img) {
  img.addEventListener('click', function () {
    viewerImg.src = img.src;
    viewerImg.alt = img.alt;
    viewer.showModal();
  });
});

viewer.addEventListener('click', function () {
  viewer.close();
});


// Пасхалка: пила
const saw = document.querySelector('#saw');
const gear = document.querySelector('.gear-click');
const isMobile = window.matchMedia('(max-width: 700px)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function finishSawAnimation() {
  saw.classList.remove('driving');
  saw.style.animation = '';
  saw.style.top = '';          // возвращаем позицию из CSS
  saw.style.bottom = '';
  saw.style.left = '';
  saw.style.right = '';
}

// Десктоп: клик по шестерне — проезд справа налево
if (saw && gear) {
  gear.addEventListener('click', function () {
    if (isMobile) return;        // на телефоне пила запускается через форму

    saw.classList.remove('driving');
    saw.style.animation = 'none';
    void saw.offsetWidth;

    saw.style.animation = 'drive ' + (reducedMotion ? 1.8 : 3) + 's linear 1 forwards';
    saw.classList.add('driving');
  });

  saw.addEventListener('animationend', finishSawAnimation);
  saw.addEventListener('animationcancel', finishSawAnimation);
}


function launchSawRide() {
  if (!saw) return;

  // Останавливаем предыдущую анимацию, если она ещё работает
  if (saw._ride) {
    saw._ride.cancel();
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const sawWidth = saw.offsetWidth || 112;
  const sawHeight = saw.offsetHeight || 112;

  // Отступ от края экрана
  const margin = 8;

  // Реальные координаты крайних положений
  const leftX = margin;
  const rightX = width - sawWidth - margin;

  // Начинаем за верхней границей
  saw.style.position = 'fixed';
  saw.style.top = '0';
  saw.style.left = '0';
  saw.style.right = 'auto';
  saw.style.bottom = 'auto';

  // Пила движется по ломаной: справа → слева → справа → слева
  const points = [
    [rightX, -sawHeight],
    [leftX, height * 0.25],
    [rightX, height * 0.50],
    [leftX, height * 0.75],
    [rightX, height + 20]
  ];

  const keyframes = points.map((point, i) => ({
    transform:
      `translate3d(${point[0]}px, ${point[1]}px, 0) rotate(${i * 2160}deg)`
  }));

  const ride = saw.animate(
    keyframes,
    {
      duration: reducedMotion ? 1800 : 5000,
      easing: 'linear',
      fill: 'forwards'
    }
  );

  saw._ride = ride;

  ride.onfinish = function () {
    saw._ride = null;

    ride.cancel();

    saw.style.top = '';
    saw.style.left = '';
    saw.style.right = '';
    saw.style.bottom = '';
    saw.style.position = '';
  };
}





// Кнопка "Узнать стоимость"
const banner = document.querySelector('#price-banner');

document.querySelector('#price-btn').addEventListener('click', function () {
  banner.classList.add('shown');
});

document.querySelector('#price-close').addEventListener('click', function () {
  banner.classList.remove('shown');
});


// Обратная связь: проверка данных и подтверждение отправки
const form = document.querySelector('#feedback-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();   // сервера пока нет — никуда не отправляем

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value;
  const message = form.elements.message.value.trim().toLowerCase();

  if (!email.includes('@')) {
    form.elements.email.focus();
    return;
  }

  // Секретное слово: на телефоне через 1,5 с пила проезжает экран
  if (message === 'saw' && isMobile) {
    setTimeout(launchSawRide, 1500);
  }

  alert('Спасибо, ' + name + '! Мы свяжемся с вами.');
  form.reset();
});