document.addEventListener('DOMContentLoaded', function() {
  startApp();
});

function startApp() {
  createGallery();
  scrollNav();
}

function scrollNav() {
  const links = document.querySelectorAll('.navegacion-principal a');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionToScroll = e.target.attributes.href.value;
      const section = document.querySelector(sectionToScroll);
      section.scrollIntoView({ behavior: 'smooth' });
    })
  })
}

function createGallery() {
  const gallery = document.querySelector('.galeria-imagenes');

  for(let i = 1; i <= 12; i++) {
    const image = document.createElement('picture');
    image.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="Imagen Galería">
    `;

    image.onclick = () => {
      showImage(i);
    }

    gallery.appendChild(image);

    console.log(image);
  }
}

function showImage(id) {
  const image = document.createElement('picture');
  image.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" src="build/img/grande/${id}.jpg" alt="Imagen Galería">
  `;

  // Create overlay for floating image
  const overlay = document.createElement('div');
  overlay.appendChild(image);
  overlay.classList.add('overlay');
  overlay.onclick = () => {
    overlay.remove();
    
    // Add image yo HTML
    const body = document.querySelector('body');
    body.classList.remove('fix-body');
  }

  // Button to close modal
  const closeModal = document.createElement('p');
  closeModal.textContent = 'X';
  closeModal.classList.add('btn-close');
  closeModal.onclick = () => {
    overlay.remove();
    
    // Add image yo HTML
    const body = document.querySelector('body');
    body.classList.remove('fix-body');
  }
  overlay.appendChild(closeModal);

  // Add image yo HTML
  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('fix-body');
}