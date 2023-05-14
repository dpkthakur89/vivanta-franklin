export default async function decorate(block) {
  const slides = [...block.children];
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  
  
  slides.forEach((slide) => {
    const overlay = document.createElement('div');
    overlay.classList.add('slideshow-overlay');
    //slide.append(searchBar);
    [...slide.firstElementChild.children].forEach((child) => {
      if (child.nodeName !== 'PICTURE' && !child.querySelector('picture')) {
        overlay.append(child);
        if (child.querySelector('a')) {
          const a = child.querySelector('a');
          if (a.textContent === child.textContent) {
            a.classList.add('btn', 'slideshow-btn');
            child.classList.add('slideshow-btn-wrapper');
          }
        }
      } else if (child.querySelector('picture')) {
        child.outerHTML = child.outerHTML.replace('<p>', '').replace('</p>', '');
        slide.firstElementChild.classList.add('slideshow-img');
      }
      slide.classList.add('slideshow-slide');
    });
    if (overlay.children) {
      slide.append(overlay);
      slide.append(buttons);
      
      
    }
  });

  // setup for multiple slides
  if (slides.length > 1) {
    // duplicate first slide at the end of the slideshow to create illusion of endless loop
    block.append(slides[0].cloneNode(true));

    let index = 0;
    setInterval(() => {
      if (index < slides.length) {
        // next slide
        [...buttons.children].forEach((r, i) => {
          if (i === index) {
            document.getElementById(i).classList.add('selected');
          } else {
            document.getElementById(i).classList.remove('selected');
          }
        });

        block.classList.add('slideshow-transition');
        block.scrollLeft += block.offsetWidth;
        index += 1;
        setTimeout(() => {
          block.classList.remove('slideshow-transition');
          // check if last slide
          if (index === slides.length) {
            // quietly sneak back to start
            block.scrollLeft = 0;
            index = 0;
          }
        }, 10000);
      }
    }, 30000);
    window.addEventListener('resize', () => {
      block.scrollLeft = 0;
      index = 0;
    });
  }
  [...block.children].forEach((row, i) => {
  /* buttons */
    const button = document.createElement('button');
    button.setAttribute('id', i);
    if (!i === 0) button.classList.add('selected');
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });
  block.parentElement.append(buttons);
}
