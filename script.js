const paginiBtn = document.getElementById('paginiBtn');
  const socialPopup = document.getElementById('socialPopup');

  paginiBtn.addEventListener('click', () => {
    // Toggle 'show' class
    if (socialPopup.classList.contains('show')) {
      socialPopup.classList.remove('show');
      setTimeout(() => {
        socialPopup.style.display = 'none';
      }, 300); // wait for animation to end
    } else {
      socialPopup.style.display = 'block';
      requestAnimationFrame(() => {
        socialPopup.classList.add('show');
      });
    }
  });

  // Optional: hide popup when clicking outside
  document.addEventListener('click', function (e) {
    if (!paginiBtn.contains(e.target) && !socialPopup.contains(e.target)) {
      if (socialPopup.classList.contains('show')) {
        socialPopup.classList.remove('show');
        setTimeout(() => {
          socialPopup.style.display = 'none';
        }, 300);
      }
    }
  });

  

const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropdownMenu = document.querySelector('.dropdown_menu');

// Toggle dropdown on button click
toggleBtn.onclick = function () {
  dropdownMenu.classList.toggle('open');

  const isOpen = dropdownMenu.classList.contains('open');
  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
};

// Handle window resize to reset dropdown state
window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    dropdownMenu.classList.remove('open');
    toggleBtnIcon.classList = 'fa-solid fa-bars';
  }
});


document.getElementById('current-year').textContent = new Date().getFullYear();