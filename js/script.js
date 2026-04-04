/* ============================================================
   PERSONAL WEBSITE — JavaScript
   DECO1400 S1 2026 — Ben Bryant

   Interactivity: active page highlighting, mobile menu,
   form validation, blog signup, cursor blink.
   Sidebar folders use native <details>/<summary> — no JS needed.
   ============================================================ */


/* === MAIN INITIALIZATION === */
document.addEventListener('DOMContentLoaded', function() {
    initPaneLabels();
    initActivePageHighlight();
    initMobileMenu();
    initFormValidation();
    initSignupForm();
    initCursorBlink();
});


/* ============================================================
   PANE LABELS
   Copies data-pane from inner pane to wrapper's data-label
   so the CSS ::before on the non-scrolling wrapper can show it.
   ============================================================ */
function initPaneLabels() {
    /* Copy data-pane from inner pane to wrapper for CSS attr() */
    const main = document.querySelector('.site-main');
    const pane = main ? main.querySelector('.pane[data-pane]') : null;
    if (main && pane) {
        main.setAttribute('data-label', pane.getAttribute('data-pane'));
    }
}


/* ============================================================
   ACTIVE PAGE HIGHLIGHTING
   Matches current URL path to sidebar links and marks the
   matching item as active. Also opens parent <details> folders.
   ============================================================ */
function initActivePageHighlight() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.file-tree__list a');

    links.forEach(function(link) {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        /* Extract just the filename for comparison */
        const linkPage = href.split('/').pop();

        /* Match by filename or full path ending */
        if (currentPage === linkPage || currentPath.endsWith(href)) {
            link.classList.add('file-tree__link--active');

            /* Open all parent <details> so this link is visible */
            let parent = link.closest('details');
            while (parent) {
                parent.setAttribute('open', '');
                parent = parent.parentElement.closest('details');
            }
        }
    });
}


/* ============================================================
   MOBILE MENU TOGGLE
   Shows/hides the sidebar on mobile via class toggle.
   Also manages an overlay backdrop for click-to-close.
   ============================================================ */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener('click', function() {
        const isOpen = sidebar.classList.contains('site-sidebar--open');

        if (isOpen) {
            closeMobileMenu(sidebar, overlay, menuToggle);
        } else {
            sidebar.classList.add('site-sidebar--open');
            if (overlay) overlay.classList.add('sidebar-overlay--visible');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.textContent = '[x]';
        }
    });

    /* Close sidebar when overlay is clicked */
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMobileMenu(sidebar, overlay, menuToggle);
        });
    }
}

/* Helper to close mobile menu */
function closeMobileMenu(sidebar, overlay, toggle) {
    sidebar.classList.remove('site-sidebar--open');
    if (overlay) overlay.classList.remove('sidebar-overlay--visible');
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '[=]';
    }
}


/* ============================================================
   FORM VALIDATION
   Terminal-styled validation for the contact form.
   Validates name, email, and message fields.
   ============================================================ */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        const name = form.querySelector('#contact-name');
        const email = form.querySelector('#contact-email');
        const message = form.querySelector('#contact-message');

        /* Clear previous errors */
        clearFormErrors(form);

        /* Validate name */
        if (!name.value.trim()) {
            showFieldError(name, 'ERROR: Name field cannot be empty');
            isValid = false;
        }

        /* Validate email */
        if (!isValidEmail(email.value)) {
            showFieldError(email, 'ERROR: Invalid email format');
            isValid = false;
        }

        /* Validate message */
        if (!message.value.trim()) {
            showFieldError(message, 'ERROR: Message field cannot be empty');
            isValid = false;
        }

        /* Show success if all valid */
        if (isValid) {
            const success = form.querySelector('.form-success');
            if (success) {
                success.classList.add('form-success--visible');
                success.textContent = '> Message sent successfully. Thank you!';
            }
            form.reset();
        }
    });
}

/* Check if email format is valid */
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.trim());
}

/* Show error message below a field */
function showFieldError(field, message) {
    field.classList.add('form-input--error');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('form-error--visible');
    }
}

/* Clear all form errors */
function clearFormErrors(form) {
    const errorEls = form.querySelectorAll('.form-error');
    errorEls.forEach(function(el) {
        el.classList.remove('form-error--visible');
        el.textContent = '';
    });

    const errorInputs = form.querySelectorAll('.form-input--error, .form-textarea--error');
    errorInputs.forEach(function(el) {
        el.classList.remove('form-input--error');
        el.classList.remove('form-textarea--error');
    });

    const success = form.querySelector('.form-success');
    if (success) {
        success.classList.remove('form-success--visible');
    }
}


/* ============================================================
   BLOG SIGNUP FORM
   Simple email validation and success message for the
   blog subscription form.
   ============================================================ */
function initSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = form.querySelector('#signup-email');
        const success = document.getElementById('signup-success');

        if (!emailInput || !isValidEmail(emailInput.value)) {
            emailInput.classList.add('form-input--error');
            return;
        }

        emailInput.classList.remove('form-input--error');

        /* Show success message */
        if (success) {
            success.classList.add('form-success--visible');
            success.textContent = '> Subscribed! You\'ll receive updates at ' + emailInput.value.trim();
        }

        form.reset();
    });
}


/* ============================================================
   CURSOR BLINK
   Adds the blinking cursor character to elements with
   the .cursor class. Pure visual enhancement.
   ============================================================ */
function initCursorBlink() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(function(el) {
        if (!el.textContent) {
            el.textContent = '\u2588'; /* Full block character */
        }
    });
}
