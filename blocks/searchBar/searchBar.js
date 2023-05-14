import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  //const ul = document.createElement('ul');
  const searchBar = document.createElement('input');
  searchBar.className = 'searchbar-input';
  searchBar.setAttribute('type', 'text');
  searchBar.setAttribute('placeholder', 'Search for Hotels, Restaurants and more..');
  searchBar.setAttribute('name', 'searchbar-global');
  searchBar.setAttribute('aria-label', 'Search Bar');
  /*[...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));*/
  block.textContent = '';
  block.append(searchBar);
}
