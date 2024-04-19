const testimonials = [
  { 
    title: 'Cera Modeladora "Black Elfa"',
    text: "Criada para homens bem definidos ao objetivo de se destacar no meio em que estiver", 
    img: "product-black",
  },
  { 
    title: 'Cera Modeladora "Elfa Caramelito"',
    text: "Trás o brilho aos diversos estilos de penteados que você poderá criar.",
    img: "product-caramel",
  },
  { 
    title: 'Cera Modeladora "Black Elfa"',
    text: "Criada para homens bem definidos ao objetivo de se destacar no meio em que estiver", 
    img: "product-black-02",
  },
  { 
    title: 'Cera Modeladora "Elfa Caramelito"',
    text: "Trás o brilho aos diversos estilos de penteados que você poderá criar.",
    img: "product-caramel-02",
  },
];

function generateCarouselItems() {
  let carouselItemsHtml = '';

  const itemsToShow = 4;
  const middleItemIndex = Math.floor(testimonials.length / 2);

  let startIndex = middleItemIndex - Math.floor(itemsToShow / 2);
  startIndex = Math.max(0, startIndex);
  startIndex = Math.min(testimonials.length - itemsToShow, startIndex);

  for (let i = startIndex; i < startIndex + itemsToShow && i < testimonials.length; i++) {
    const testimonial = testimonials[i];

    carouselItemsHtml += 
    `
    <div class="column g-16 slide-item">
      <div class="img">
        <picture>
          <source media="(min-width: 1200px)" srcset="./src/images/desktop/${testimonial.img}.webp">
          <source media="(min-width: 768px)" srcset="./src/images/tablet/${testimonial.img}.webp">
          <source media="(min-width: 320px)" srcset="./src/images/mobile/${testimonial.img}.webp">
          <img loading="lazy" src="./src/images/desktop/${testimonial.img}.webp">
        </picture>
      </div>

      <div class="column g-8">
        <h6 class="center bold primary-500">
          ${testimonial.title}  
        </h6>

        <p class="center light primary-900">
          ${testimonial.text}
        </p>
      </div>
    </div>
    `;
  }    
  document.getElementById('slide').innerHTML = carouselItemsHtml;
};

generateCarouselItems();

function goToNextFeedback() {
  testimonials.push(testimonials.shift());
  generateCarouselItems();
}

function goToPreviousFeedback() {
  testimonials.unshift(testimonials.pop());
  generateCarouselItems();
}

document.querySelector('#prev').addEventListener('click', goToPreviousFeedback);
document.querySelector('#next').addEventListener('click', goToNextFeedback);