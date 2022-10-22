const slides = document.querySelectorAll('.slides');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const slider = document.querySelector('.slider');


let curSlide = 0;
const maxSlide = slides.length;
const goToSlide = (slide)=> {
  slides.forEach((slide, i)=> {s.style.transform = `translateX(${100*(i-slide)}%)`
})};
goToSlide(0);

const nextSlide = ()=> { if(curSlide===maxSlide-1) {
  curSlide=0
} else {
curSlide++};
goToSlide(curSlide);
}
const prevSlide = ()=> {
  if(curSlide===0) {
    curSlide=maxSlide -1
  } else {
    curSlide--
  }
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide)