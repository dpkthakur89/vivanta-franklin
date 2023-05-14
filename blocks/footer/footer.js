import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);
    block.append(footer);
  }
  var destination = document.querySelector('.destination');
   var destinationList = document.querySelector('.destination-list');
destination.addEventListener('click', function() {
  if (destinationList.style.display === 'none') {
    destinationList.style.display = 'block';
    destination.innerHTML = 'Destinations -'
  } else {
    destinationList.style.display = 'none';
    destination.innerHTML = 'Destinations +'
  }
});

var loyalty = document.querySelector('.loyality');
 var loyaltyList = document.querySelector('.loyalty-list')
loyalty.addEventListener('click', function() {
  if (loyaltyList.style.display === 'none') {
    loyaltyList.style.display = 'block';
    loyalty.innerHTML = 'Loyalty Programs -'
  } else {
    loyaltyList.style.display = 'none';
    loyalty.innerHTML = 'Loyalty Programs +'
  }
});

}

/** mumtaz blog script */
