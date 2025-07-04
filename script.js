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
        const title = card.dataset.title;
        const serviceClass = card.classList[1]; // Get the service-1, service-2, etc. class
        const details = serviceDetails[title];
        const isDark = card.classList.contains('dark');
        
        if (!details) return;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = `modal-content ${isDark ? 'dark' : ''}`;
        
        // Create triangle background with service-specific image
        const triangleBg = document.createElement('div');
        triangleBg.className = `modal-triangle-bg ${serviceClass}`;
        
        // Rest of your modal creation code...
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close modal');
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title;
        
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'modal-details';
        
        const detailsList = document.createElement('ul');
        detailsList.className = 'check-list';
        
        details.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          detailsList.appendChild(li);
        });
        
        // Build structure
        detailsContainer.appendChild(detailsList);
        modalContent.appendChild(triangleBg);
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(detailsContainer);
        modal.appendChild(modalContent);
        
        // Add to DOM
        document.body.appendChild(modal);
        document.body.classList.add('no-scroll');
        
        // Force reflow to enable CSS transitions
        void modal.offsetHeight;
        
        // Activate modal
        modal.classList.add('active');
        
        // Close handlers
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
        
        function closeModal() {
          modal.classList.remove('active');
          setTimeout(() => {
            modal.remove();
            document.body.classList.remove('no-scroll');
          }, 400);
        }
      });
      
      // Prevent arrow clicks from opening modal
      const arrow = card.querySelector('.arrow-right');
      if (arrow) {
        arrow.addEventListener('click', e => e.stopPropagation());
      }
    });
  })
  .catch(error => console.error('Error loading service details JSON:', error));

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
