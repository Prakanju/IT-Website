/* ===========================
   SPACE EXPLORATION WEBSITE
   Main JavaScript File
=========================== */


/* ===========================
   IMAGE SLIDER (index.html)
=========================== */

var currentSlideIndex = 0;
var totalSlides = 5;
var sliderAutoPlayTimer;

function moveToSlide(index) {
  var slider = document.querySelector('.slider-container');
  if (!slider) return;

  if (index >= totalSlides) {
  currentSlideIndex = 0;
} else if (index < 0) {
  currentSlideIndex = totalSlides - 1;
} else {
  currentSlideIndex = index;
}

  slider.style.transform = 'translateX(-' + (currentSlideIndex * 20) + '%)';
  updateActiveDot();
}

function goToNextSlide() {
  moveToSlide(currentSlideIndex + 1);
}

function goToPrevSlide() {
  moveToSlide(currentSlideIndex - 1);
}

function updateActiveDot() {
  var allDots = document.querySelectorAll('.slider-dot');
  allDots.forEach(function(dot, index) {
    if (index === currentSlideIndex) {
      dot.classList.add('dot-active');
    } else {
      dot.classList.remove('dot-active');
    }
  });
}

function startSliderAutoPlay() {
  sliderAutoPlayTimer = setInterval(function() {
    goToNextSlide();
  }, 4000);
}

function stopSliderAutoPlay() {
  clearInterval(sliderAutoPlayTimer);
}

function setupSlider() {
  var prevButton = document.querySelector('.slider-prev-btn');
  var nextButton = document.querySelector('.slider-next-btn');
  var allDots = document.querySelectorAll('.slider-dot');

  if (!prevButton || !nextButton) return;

  prevButton.addEventListener('click', function() {
    stopSliderAutoPlay();
    goToPrevSlide();
    startSliderAutoPlay();
  });

  nextButton.addEventListener('click', function() {
    stopSliderAutoPlay();
    goToNextSlide();
    startSliderAutoPlay();
  });

  allDots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
      stopSliderAutoPlay();
      moveToSlide(index);
      startSliderAutoPlay();
    });
  });

  updateActiveDot();
  startSliderAutoPlay();
}


/* ===========================
   GALLERY POPUP (gallery.html)
=========================== */

function setupGalleryPopup() {
  var allThumbnailLinks = document.querySelectorAll('.thumbnail-link-wrapper');
  var popupOverlay = document.querySelector('.image-popup-overlay');
  var popupImage = document.querySelector('.popup-full-image');
  var popupCaption = document.querySelector('.popup-caption-text');
  var closeButton = document.querySelector('.popup-close-btn');

  if (!popupOverlay) return;

  allThumbnailLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var fullImageSrc = link.getAttribute('href');
      var captionText = link.getAttribute('data-caption');

      popupImage.src = fullImageSrc;
      popupCaption.textContent = captionText;
      popupOverlay.classList.add('overlay-visible');
    });
  });

  closeButton.addEventListener('click', function() {
    popupOverlay.classList.remove('overlay-visible');
  });

  popupOverlay.addEventListener('click', function(event) {
    if (event.target === popupOverlay) {
      popupOverlay.classList.remove('overlay-visible');
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      popupOverlay.classList.remove('overlay-visible');
    }
  });
}


/* ===========================
   CONTACT FORM VALIDATION (contact.html)
=========================== */

function showFieldError(inputElement, errorElementId) {
  var errorBox = document.getElementById(errorElementId);
  inputElement.style.borderColor = '#f87171';
  if (errorBox) { errorBox.classList.add('error-visible'); }
}

function hideFieldError(inputElement, errorElementId) {
  var errorBox = document.getElementById(errorElementId);
  inputElement.style.borderColor = '';
  if (errorBox) { errorBox.classList.remove('error-visible'); }
}

function isValidEmail(emailAddress) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(emailAddress);
}

function validateContactForm(event) {
  event.preventDefault();

  var nameInput = document.getElementById('visitor-name');
  var emailInput = document.getElementById('visitor-email');
  var topicSelect = document.getElementById('message-topic');
  var messageInput = document.getElementById('visitor-message');
  var successBox = document.querySelector('.form-success-message');

  var formHasErrors = false;

  /* Check name */
  if (nameInput.value.trim() === '') {
    showFieldError(nameInput, 'name-error');
    formHasErrors = true;
  } else {
    hideFieldError(nameInput, 'name-error');
  }

  /* Check email format */
  if (!isValidEmail(emailInput.value.trim())) {
    showFieldError(emailInput, 'email-error');
    formHasErrors = true;
  } else {
    hideFieldError(emailInput, 'email-error');
  }

  /* Check topic selected */
  if (topicSelect.value === '') {
    showFieldError(topicSelect, 'topic-error');
    formHasErrors = true;
  } else {
    hideFieldError(topicSelect, 'topic-error');
  }

  /* Check message not empty */
  if (messageInput.value.trim().length < 10) {
    showFieldError(messageInput, 'message-error');
    formHasErrors = true;
  } else {
    hideFieldError(messageInput, 'message-error');
  }

  /* If no errors, show success */
  if (!formHasErrors) {
    successBox.classList.add('success-visible');
    nameInput.value = '';
    emailInput.value = '';
    topicSelect.value = '';
    messageInput.value = '';
  }
}

function setupContactForm() {
  var theForm = document.getElementById('space-contact-form');
  if (!theForm) return;
  theForm.addEventListener('submit', validateContactForm);
}



/* ===========================
   RUN EVERYTHING ON PAGE LOAD
=========================== */

document.addEventListener('DOMContentLoaded', function() {
  setupSlider();
  setupGalleryPopup();
  setupContactForm();
});
