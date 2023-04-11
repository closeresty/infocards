

const slideElements = ['.back__slide', '.card__slide', '.content__slide'];
let inProgress = false;

const goToSlide = (slideElements, index) => {
  if (!inProgress){
    inProgress = true;
    
    $('.active').addClass('exit');
    $('.active').removeClass('active');
    slideElements.forEach( elem => {
      $(`${elem}:nth-child(${index})`).addClass('active');
    })
    
    const evenSlide = index % 2 === 0;
    if (evenSlide)
      $('.content__ping').addClass('content__ping--right');
    else
      $('.content__ping').removeClass('content__ping--right');
    $('.content__ping--noanimation').removeClass('content__ping--noanimation');
    
    setTimeout(() => $('.exit').removeClass('exit'), 1000);
    setTimeout(() => inProgress = false, 2000);
  }
}

$('.content__slide:nth-child(1) .button').on('click', () => goToSlide(slideElements, 2) );
$('.content__slide:nth-child(2) .button').on('click', () => goToSlide(slideElements, 1) );

setTimeout( () => goToSlide(slideElements, 2), 2000 );
setTimeout( () => goToSlide(slideElements, 1), 6000 );

let amount = 0;
let slide = 0;

const progress = () => {
  amount++
  $('.active .progress').css('transform', `scaleX(${amount/400})`)
  if (amount >= 400){
    amount = 0;
    $('.active .progress').css('transform', `scaleX(${amount/400})`)
    slide = (slide + 1) % 2 ;
    goToSlide(slideElements, slide + 1);
    clearInterval(progressInterval);
    setTimeout(()=>{ 
      progressInterval = setInterval(progress,20); 
      $('.back__slide:not(.active) .progress').css('transform', 'scaleX(0)')
    }, 2000);
  }
}

let progressInterval = setInterval(progress,20);