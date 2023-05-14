import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  var rowCount = 1;
  [...block.children].forEach((row) => {
    
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    
      [...li.children].forEach((div) => {
        if(block.classList.contains('exp')){
        if(rowCount <= 3) {
          div.parentNode.className='displayYes'; 
          if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image displayYes';
          else div.className = 'cards-card-body displayYes';
        }else {
          div.parentNode.className='displayNo'; 
          if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image displayNo';
          else div.className = 'cards-card-body displayNo';
        }}
        
        
        /*if(block.classList.contains('hotel')){
          if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
          else div.className = 'cards-card-body';
        }*/
      });
    ul.append(li);

        rowCount++

  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  
  const searchMore = document.querySelector('.cards-container > .default-content-wrapper p u');
  searchMore.onclick = function() {
    var elemList = '';
    if (searchMore.innerHTML==='Show More') {
      elemList = document.querySelectorAll('.cards.exp .displayNo');
    } else if (searchMore.innerHTML === 'Show Less'){
      elemList = document.querySelectorAll('.cards.exp .displayYes');
    }

    var elemCnt = 1;
    elemList.forEach((elem) => {
      if (searchMore.innerHTML==='Show More') {
        elem.classList.add('displayYes');
        elem.classList.remove('displayNo');
        
        //alert(searchMore.innerHTML);
      } else if (searchMore.innerHTML==='Show Less') {
        //searchMore.innerHTML =' Show More';
        if(elemCnt > 9){
          elem.classList.add('displayNo');
          elem.classList.remove('displayYes');
        }
        elemCnt++;
      }
      
    });
    if (searchMore.innerHTML==='Show More') {
      searchMore.innerHTML = 'Show Less';
    } else if (searchMore.innerHTML === 'Show Less'){
      searchMore.innerHTML='Show More'
    }
    
};
//slider css 
const rightArrow = document.querySelector('.cards-container > .default-content-wrapper > p > .icon.icon-rightarrow');
const leftArrow = document.querySelector('.cards-container > .default-content-wrapper > p > .icon.icon-leftarrow');

leftArrow.onclick = function() {
    var myText = "This is left arrow";
    alert (myText);
    var x = document.querySelectorAll(".cards.prom > ul > li");
    for (let i = 0; i < x.length; i++) {
      if (i < 3) {x[i].style.display = "block"}
      else  {x[i].style.display = "none"}
      leftArrow.style.display = "none"
      rightArrow.style.display = "inline-block"
      
    }
    
};

rightArrow.onclick = function() {
  var myText = "This is right arrow";
  alert (myText);
  var x = document.querySelectorAll(".cards.prom > ul > li");
  for (let i = 0; i < x.length; i++) {
    
      if (i < 2) {x[i].style.display = "none"}
        else  {x[i].style.display = "block"}
        rightArrow.style.display = "none"
        leftArrow.style.display = "inline-block"

}
};


  block.textContent = '';
  block.append(ul);
}
