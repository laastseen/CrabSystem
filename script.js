const modal = document.getElementById('request-modal');
const openModalButtons = document.querySelectorAll('[data-open-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const form = document.querySelector('.form');

const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.slider__dot'));
const prevButton = document.querySelector('.slider__control--prev');
const nextButton = document.querySelector('.slider__control--next');

let currentSlide = 0;

function openModal() {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentSlide);
  });
}

openModalButtons.forEach((button) => {
  button.addEventListener('click', openModal);
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

if (prevButton) {
  prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
}

if (nextButton) {
  nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeModal();
  }

  if (event.key === 'ArrowLeft') {
    showSlide(currentSlide - 1);
  }

  if (event.key === 'ArrowRight') {
    showSlide(currentSlide + 1);
  }
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    form.reset();
    closeModal();
  });
}

showSlide(0);