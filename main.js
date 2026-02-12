import './style.css'
import '@fontsource/playfair-display';
import '@fontsource/montserrat';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
  // Init AOS with error handling
  try {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  } catch (e) {
    console.warn('AOS Init failed:', e);
  }

  // Remove Loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');

      // Animate hamburger to X
      const bars = menuToggle.querySelectorAll('.bar');
      if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Reset hamburger
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
  }

  // Background Music - Auto-play on first user interaction
  const music = document.getElementById('bg-music');
  if (music) {
    // Set source dynamically so Vite's base URL works on GitHub Pages
    music.src = import.meta.env.BASE_URL + 'images/music.MP3';
    music.volume = 0.3;
    const tryPlay = () => {
      music.play().catch(() => { });
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('scroll', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };
    // Try autoplay immediately
    music.play().catch(() => {
      // Blocked by browser - wait for first user interaction
      document.addEventListener('click', tryPlay, { once: true });
      document.addEventListener('scroll', tryPlay, { once: true });
      document.addEventListener('touchstart', tryPlay, { once: true });
    });
  }
});
