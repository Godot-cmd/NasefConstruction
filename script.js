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



// SERVICE DETAILS
fetch('data/services.json')
  .then(response => response.json())
  .then(data => {
    serviceDetails = data;

    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        const alreadyExpanded = card.classList.contains('expanded');

        if (alreadyExpanded) {
          // Do nothing if already expanded
          return;
        }

        // Collapse all other cards
        document.querySelectorAll('.service-card.expanded').forEach(c => {
          c.classList.remove('expanded');
          const detailContainer = c.querySelector('.details');
          if (detailContainer) detailContainer.innerHTML = '';
        });

        // Expand clicked card
        card.classList.add('expanded');
        document.body.classList.add('no-scroll');  // Disable body scroll here

        const title = card.dataset.title;
        const details = serviceDetails[title];
        const detailContainer = card.querySelector('.details');
        if (details && detailContainer) {
          const ul = document.createElement('ul');
          ul.classList.add('check-list');
          details.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          detailContainer.appendChild(ul);
        }
      });

      // Prevent arrow clicks from toggling card
      const arrow = card.querySelector('.arrow-right');
      if (arrow) {
        arrow.addEventListener('click', e => e.stopPropagation());
      }

      // Close button listener
      const closeBtn = card.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.remove('expanded');
          document.body.classList.remove('no-scroll'); // Enable body scroll back
          const detailContainer = card.querySelector('.details');
          if (detailContainer) detailContainer.innerHTML = '';
        });
      }
    });
  })
  .catch(error => console.error('Error loading service details JSON:', error));



document.querySelectorAll('.service-card').forEach(card => {
  console.log('Card:', card);
  const closeBtn = card.querySelector('.close-btn');
  console.log('closeBtn found:', closeBtn);
});

 document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.services .container');
    const leftArrow = document.querySelector('.scroll-arrow-left');
    const rightArrow = document.querySelector('.scroll-arrow-right');
    const gap = 20;

    const updateArrows = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Show left arrow only if scrolled right
      if (scrollLeft > 10) {
        leftArrow.style.opacity = '1';
        leftArrow.style.pointerEvents = 'auto';
      } else {
        leftArrow.style.opacity = '0';
        leftArrow.style.pointerEvents = 'none';
      }

      // Optionally hide right arrow if at end
      if (scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        rightArrow.style.opacity = '0.3';
        rightArrow.style.pointerEvents = 'none';
      } else {
        rightArrow.style.opacity = '1';
        rightArrow.style.pointerEvents = 'auto';
      }
    };

    rightArrow.addEventListener('click', () => {
      const cardWidth = container.querySelector('.service-card')?.offsetWidth || 320;
      container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });

    leftArrow.addEventListener('click', () => {
      const cardWidth = container.querySelector('.service-card')?.offsetWidth || 320;
      container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });

    container.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    updateArrows(); // initial check
  });