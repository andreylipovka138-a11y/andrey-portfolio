// Эффект плавного появления блоков при прокрутке
const sections = document.querySelectorAll('section');

const showSection = () => {
  const triggerBottom = window.innerHeight * 0.8;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
};

window.addEventListener('scroll', showSection);
showSection();

// --- Лайтбокс (увеличение фото) ---
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
// --- Навигация в лайтбоксе ---
let currentIndex = 0;

galleryImages.forEach((img, i) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    currentIndex = i;
  });
});

function changeImage(indexChange) {
  lightboxImg.classList.add('fade-out');
  setTimeout(() => {
    currentIndex = (currentIndex + indexChange + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.classList.remove('fade-out');
    lightboxImg.classList.add('fade-in');
    setTimeout(() => lightboxImg.classList.remove('fade-in'), 400);
  }, 300);
}

document.querySelector('.arrow.left').addEventListener('click', () => changeImage(-1));
document.querySelector('.arrow.right').addEventListener('click', () => changeImage(1));
