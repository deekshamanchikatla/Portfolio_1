/* ════════════════════════════════════════════════════════════
   DEEKSHITHA MANCHIKATLA — PORTFOLIO SCRIPT
   File: assets/script.js
════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────
   1. NAVBAR — Shrink on scroll
────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ──────────────────────────────────────────────────────────
   2. MOBILE NAV — Toggle open / close
────────────────────────────────────────────────────────── */
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});


/* ──────────────────────────────────────────────────────────
   3. SCROLL-REVEAL — Animate sections into view
────────────────────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger each element slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);

        // Stop observing once visible (animate once)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* ──────────────────────────────────────────────────────────
   4. ACTIVE NAV LINK — Highlight current section
────────────────────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.style.color = '';  // reset
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((sec) => sectionObserver.observe(sec));


/* ──────────────────────────────────────────────────────────
   5. CONTACT FORM — Mock send with feedback
────────────────────────────────────────────────────────── */
function handleSend() {
  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const btn     = document.querySelector('.btn-send');

  // Basic validation
  if (!name || !email || !subject || !message) {
    btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Fill all fields';
    btn.style.background = '#f59e0b';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
    }, 2500);
    return;
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid email';
    btn.style.background = '#f59e0b';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
    }, 2500);
    return;
  }

  // Simulate sending
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled  = true;
  btn.style.opacity = '0.8';

  setTimeout(() => {
    btn.innerHTML       = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#22c55e';
    btn.style.opacity   = '1';
    btn.disabled        = false;

    // Clear fields
    document.getElementById('senderName').value  = '';
    document.getElementById('senderEmail').value = '';
    document.getElementById('subject').value     = '';
    document.getElementById('message').value     = '';

    // Reset button after 3 s
    setTimeout(() => {
      btn.innerHTML        = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
    }, 3000);
  }, 1500);
}


/* ──────────────────────────────────────────────────────────
   6. SKILL CHIPS — Bounce on click (fun touch)
────────────────────────────────────────────────────────── */
document.querySelectorAll('.skill-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.style.transform = 'scale(0.93)';
    setTimeout(() => {
      chip.style.transform = '';
    }, 150);
  });
});
