document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
        entry.target.style.animationDelay = `${index * 0.2}s`;
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.style.animationDelay = `${index * 0.2}s`;
      section.classList.add('in-view');
    }
    observer.observe(section);
  });

  // theme toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
  } else {
    themeToggleBtn.textContent = '🌙';
  }
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // hide header on scroll down
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.l-header');
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.classList.add('hidden');
    } else if (scrollTop <= 0) {
      header.classList.remove('hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
