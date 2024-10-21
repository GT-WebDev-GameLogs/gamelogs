let currentIndex = 0;
const images = document.querySelectorAll('.image-slider img');
const totalImages = images.length;

function cycleImages() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].classList.add('active');
}

setInterval(cycleImages, 5000);
