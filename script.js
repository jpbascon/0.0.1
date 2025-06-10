const darkLight = document.querySelector('.js-dark-light');
const brandName = document.querySelector('.js-brand-name');
const brandLogo = document.querySelector('.js-brand-logo');
const header = document.querySelector('.js-header');
const body = document.querySelector('body');
const showFilter = document.querySelector('.js-filter');
const cardDarkMode = document.querySelectorAll('.js-card');
const descriptionDarkMode = document.querySelectorAll('.js-extension-details');
const removeDarkMode = document.querySelectorAll('.js-extension-remove');
const sliderDarkMode = document.querySelectorAll('.js-slider');
const buttonFilter = document.querySelectorAll('.js-filter-buttons');
const activeInactive = document.querySelectorAll('.js-checkbox');


const filterButtons = [
  document.getElementById('all-buttons'),
  document.getElementById('active-buttons'),
  document.getElementById('inactive-buttons')
];

let isDark = true;

document.addEventListener('DOMContentLoaded', () => {
  darkLight.innerHTML = '<img class="light" src="assets/images/icon-sun.svg">';
  darkLight.classList.add('light-mode');
  brandName.classList.add('light-mode');
  brandLogo.classList.add('light-mode-logo');
  header.classList.add('header-light-mode');
  body.classList.add('body-light-mode');
  lightButton();
  syncActiveButtonClass();
  updateActiveButtonClassOnModeChange();
  domLoaded();
  removeExtension();
  extensionDarkMode();

  /* Initiallty checks if activeInactive buttons is checked or not */
  activeInactive.forEach(btn => {
    if (btn.checked) {
      btn.classList.add('active');
      btn.classList.remove('inactive');
    } else {
      btn.classList.add('inactive');
      btn.classList.remove('active');
    }
  });

  /* Then calls filterStatus(); */
  filterStatus();
})

document.getElementById('dark-light-mode')
  .addEventListener('click', () => {
    if (isDark) {
      darkLight.innerHTML = '<img class="dark" src="assets/images/icon-moon.svg">';
      darkLight.classList.add('dark-mode');
      darkLight.classList.remove('light-mode');

      brandName.classList.add('dark-mode');
      brandName.classList.remove('light-mode');

      brandLogo.classList.add('dark-mode-logo');
      brandLogo.classList.remove('light-mode-logo');

      header.classList.add('header-dark-mode');
      header.classList.remove('header-light-mode');

      body.classList.add('body-dark-mode');
      body.classList.remove('body-light-mode');

      isDark = false;
      darkButton();
      syncActiveButtonClass();
      updateActiveButtonClassOnModeChange();
      removeExtension();
      extensionDarkMode();
      filterStatus();
    } else {
      darkLight.innerHTML = '<img class="light" src="assets/images/icon-sun.svg">';
      darkLight.classList.add('light-mode');
      darkLight.classList.remove('dark-mode');

      brandName.classList.add('light-mode');
      brandName.classList.remove('dark-mode');

      brandLogo.classList.add('light-mode-logo');
      brandLogo.classList.remove('dark-mode-logo');

      header.classList.add('header-light-mode');
      header.classList.remove('header-dark-mode');

      body.classList.add('body-light-mode');
      body.classList.remove('body-dark-mode');

      isDark = true;
      lightButton();
      syncActiveButtonClass();
      updateActiveButtonClassOnModeChange();
      removeExtension();
      extensionDarkMode();
      filterStatus();
    }
  })

function domLoaded() {
  const load = filterButtons[0];
  load.classList.add('dark-active');
}

function darkButton() {
  buttonFilter.forEach(btn => {
    btn.classList.add('dark-button-filter');
    btn.classList.remove('light-button-filter');
  })
}

function lightButton() {
  buttonFilter.forEach(btn => {
    btn.classList.add('light-button-filter');
    btn.classList.remove('dark-button-filter');
  })
}

/* Removes an extension */

function removeExtension() {
  removeDarkMode.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      cardDarkMode.forEach((b, i) => {
        if (i === idx) {
          b.remove();
        }
      })
    })
  })
}

/* Filters whether an extension is active or inactive */

function filterStatus() {
  activeInactive.forEach((btn) => {
    btn.addEventListener('change', () => {
      if (btn.checked) {
        btn.classList.add('active');
        btn.classList.remove('inactive');
      } else {
        btn.classList.add('inactive');
        btn.classList.remove('active');
      }
    })
  })

  buttonFilter[0].addEventListener('click', () => {
    cardDarkMode.forEach(card => {
      card.style.display = '';
    })
  })

  buttonFilter[1].addEventListener('click', () => {
    cardDarkMode.forEach((card, idx) => {
      if (activeInactive[idx].classList.contains('active')) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  buttonFilter[2].addEventListener('click', () => {
    cardDarkMode.forEach((card, idx) => {
      if (activeInactive[idx].classList.contains('inactive')) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* Filter buttons updating when clicked */

function syncActiveButtonClass() {
  // Adds event listener for buttons inside the filterButtons array
  filterButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      // Sets 'active' class only on the clicked filter button, removes it from others
      filterButtons.forEach((b, i) => {
        if (isDark) {
          if (i === idx) {
            b.classList.add('dark-active');
          } else {
            b.classList.remove('dark-active');
          }
        } else {
          if (i === idx) {
            b.classList.add('light-active');
          } else {
            b.classList.remove('light-active');
          }
        }
      });
    });
  });
}

/* Filter buttons updating whenever isDark change */

function updateActiveButtonClassOnModeChange() {
  filterButtons.forEach(btn => {
    if (btn.classList.contains('dark-active') || btn.classList.contains('light-active')) {
      btn.classList.remove('dark-active', 'light-active');
      if (isDark) {
        btn.classList.add('dark-active');
      } else {
        btn.classList.add('light-active');
      }
    }
  });
}

/* Card Dark/Light Mode */

function extensionDarkMode() {
  if (isDark) {
    cardDarkMode.forEach(card => {
      card.classList.add('card-dark-mode');
      card.classList.remove('card-light-mode');
    })
    descriptionDarkMode.forEach(description => {
      description.classList.add('card-dark-mode-description');
      description.classList.remove('card-light-mode-description');
    })
    removeDarkMode.forEach(remove => {
      remove.classList.add('card-dark-mode-remove');
      remove.classList.remove('card-light-mode-remove');
    })
    sliderDarkMode.forEach(slider => {
      slider.classList.add('card-dark-mode-slider');
      slider.classList.remove('card-light-mode-slider');
    })
  } else {
    cardDarkMode.forEach(card => {
      card.classList.remove('card-dark-mode');
      card.classList.add('card-light-mode');
    })
    descriptionDarkMode.forEach(description => {
      description.classList.remove('card-dark-mode-description');
      description.classList.add('card-light-mode-description');
    })
    removeDarkMode.forEach(remove => {
      remove.classList.remove('card-dark-mode-remove');
      remove.classList.add('card-light-mode-remove');
    })
    sliderDarkMode.forEach(slider => {
      slider.classList.remove('card-dark-mode-slider');
      slider.classList.add('card-light-mode-slider');
    })
  }
}
