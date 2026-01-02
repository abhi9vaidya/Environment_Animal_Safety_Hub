/* ===== ECOLIFE MAIN JAVASCRIPT ===== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initAOS();
  initCounterAnimation();
  initParticles();
  initFormHandlers();
  initNavbarActiveState();
  initScrollProgress()
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });
  }

  // Close mobile nav on link click
  const navLinkItems = document.querySelectorAll(".nav-link");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("nav-open");
    });
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navLinks.classList.contains("active")) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("nav-open");
    }
  });
}

function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

/* ===== NAVBAR ACTIVE STATE ===== */
function initNavbarActiveState() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  if (!backToTop) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ===== AOS (Animate On Scroll) ===== */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 100,
    });
  }
}

/* ===== COUNTER ANIMATION ===== */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = formatNumber(Math.floor(current));
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = formatNumber(target);
      }
    };

    updateCounter();
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K+";
    }
    return num.toLocaleString() + "+";
  };

  // Intersection Observer for triggering animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ===== PARTICLES EFFECT ===== */
function initParticles() {
  const particlesContainer = document.getElementById("particles");

  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random properties
  const size = Math.random() * 5 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 20;
  const duration = Math.random() * 20 + 10;
  const opacity = Math.random() * 0.5 + 0.1;

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${left}%;
        bottom: -10px;
        animation: particleFloat ${duration}s linear ${delay}s infinite;
    `;

  container.appendChild(particle);
}

// Add particle animation to stylesheet
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

/* ===== FORM HANDLERS ===== */
function initFormHandlers() {
  // Report Form
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleReportSubmit(this);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleNewsletterSubmit(this);
    });
  }

  // File upload preview
  const fileInput = document.querySelector('.file-upload input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0]?.name;
      const label = this.parentElement.querySelector(".file-upload-label span");
      if (fileName && label) {
        label.textContent = fileName;
      }
    });
  }
}

function handleReportSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Report Submitted!';
    submitBtn.style.background = "linear-gradient(135deg, #4caf50, #2e7d32)";

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;

      // Show success message
      showNotification(
        "Report submitted successfully! We will review it shortly.",
        "success"
      );
    }, 2000);
  }, 1500);
}

function handleNewsletterSubmit(form) {
  const email = form.querySelector('input[type="email"]').value;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      showNotification(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
    }, 2000);
  }, 1000);
}

/* ===== NOTIFICATION SYSTEM ===== */
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    info: "fa-circle-info",
    warning: "fa-triangle-exclamation",
  };

  notification.innerHTML = `
        <i class="fa-solid ${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: ${
          type === "success"
            ? "#4caf50"
            : type === "error"
            ? "#f44336"
            : "#2196f3"
        };
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Close button handler
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        opacity: 0.7;
        transition: opacity 0.2s;
    `;
  closeBtn.addEventListener("click", () => removeNotification(notification));

  // Auto remove after 5 seconds
  setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
  notification.style.animation = "slideOut 0.3s ease forwards";
  setTimeout(() => notification.remove(), 300);
}

/* ===== TESTIMONIAL SLIDER (Optional Enhancement) ===== */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  // Add touch support for mobile
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

/* ===== LAZY LOADING IMAGES ===== */
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

/* ===== PRELOADER (Optional) ===== */
function initPreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      document.body.classList.remove("loading");
    }, 500);
  });
}

/* ===== UTILITY FUNCTIONS ===== */

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for resize events
function throttle(func, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* ===== CONSOLE MESSAGE ===== */
console.log(
  "%c🌿 EcoLife - Protect Our Planet & Animals 🐾",
  "font-size: 20px; font-weight: bold; color: #2e7d32; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);"
);
console.log(
  "%cBuilt with ❤️ for a greener future",
  "font-size: 14px; color: #666;"
);
