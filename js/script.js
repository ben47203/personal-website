/* script.js
   all the interactive stuff for the site - shared components,
   sidebar highlighting, mobile menu, form validation, glow, etc.
   sidebar folders use native <details>/<summary> so no JS needed there */

document.addEventListener('DOMContentLoaded', function() {
    initSharedComponents();
    initActivePageHighlight();
    initMobileMenu();
    initFormValidation();
    initSignupForm();
    initSubjectTreeToggle();
    initPaneGlow();
    initResumeTree();
});


/* ---- SHARED COMPONENTS ----
   header/sidebar/footer were duplicated across 24 pages which was
   a nightmare to maintain. now each page just has empty placeholder
   elements and a window.PAGE config object, and this injects the
   actual HTML from templates. the 'base' path prefix handles pages
   at different directory depths (../ or ../../ etc) */

// nerd font icon codepoints - private use area chars from the woff2 file
const ICON_FOLDER = '\u{F024B}';
const ICON_HTML   = '\uE736';
const ICON_FILE   = '\uF15C';

function initSharedComponents() {
    const config = window.PAGE || { base: '', title: 'Home', breadcrumb: [] };
    const base = config.base;

    // only inject if the element is empty (hasn't been filled yet)
    const header = document.querySelector('.site-header');
    if (header && !header.children.length) header.innerHTML = buildHeader(config);

    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.children.length) sidebar.innerHTML = buildSidebar(base);

    const footer = document.querySelector('.site-footer');
    if (footer && !footer.children.length) footer.innerHTML = buildFooter();
}

// wraps a nerd font icon char in a span for CSS styling
function nf(type) {
    return '<span class="nf-icon nf-icon--' + type + '">' +
        (type === 'folder' ? ICON_FOLDER : type === 'html' ? ICON_HTML : ICON_FILE) +
        '</span>';
}

// tree connector character (├ └ etc) wrapped in span
function tc(ch) {
    return '<span class="tree-char">' + ch + ' </span>';
}

// builds a single file link for the sidebar tree
function fl(base, href, icon, label, treeCh) {
    return '<a href="' + base + href + '">' + tc(treeCh) + nf(icon) + ' ' + label + '</a>';
}

// builds a collapsible folder using native <details>/<summary>
function folder(base, treeCh, name, children, isOpen) {
    return '<details class="file-tree__folder"' + (isOpen ? ' open' : '') + '>' +
        '<summary>' + tc(treeCh) + nf('folder') + ' ' + name + '</summary>' +
        '<div class="file-tree__children">' + children + '</div></details>';
}

// header: mobile menu button + breadcrumb path + contact/help buttons
function buildHeader(config) {
    const base = config.base;

    // breadcrumb always starts /Users/Ben_Bryant then adds parent pages
    let crumbs = '<span class="breadcrumb__separator">/</span>' +
        '<a href="' + base + 'index.html">Users</a>' +
        '<span class="breadcrumb__separator">/</span>' +
        '<a href="' + base + 'index.html">Ben_Bryant</a>';

    // intermediate crumbs from the page config array
    config.breadcrumb.forEach(function(item) {
        crumbs += '<span class="breadcrumb__separator">/</span>' +
            '<a href="' + base + item[1] + '">' + item[0] + '</a>';
    });

    // current page at the end (not clickable)
    crumbs += '<span class="breadcrumb__separator">/</span>' +
        '<span class="breadcrumb__current">' + config.title + '</span>';

    return '<section class="pane" data-pane="0: Header">' +
        '<div class="header-content">' +
            '<nav class="breadcrumb" aria-label="Breadcrumb">' + 
                '<button class="mobile-menu-toggle" aria-label="Toggle navigation" aria-expanded="false">[=]</button>' +
                crumbs + '</nav>' +
            '<nav class="header-nav" aria-label="Quick links">' +
                '<a href="' + base + 'contact.html" class="tui-btn tui-btn--t3">Contact</a>' +
                '<a href="' + base + 'help.html" class="tui-btn tui-btn--t4">? Help</a>' +
            '</nav>' +
        '</div></section>';
}

// sidebar: full file tree mirroring the site structure
function buildSidebar(base) {
    const b = base;
    return '<section class="pane" data-pane="1: Sidebar">' +
        '<nav class="file-tree" aria-label="Site navigation">' +
        '<div class="file-tree__list">' +
        '<details class="file-tree__folder" open>' +
            '<summary>' + nf('folder') + ' ~/Ben_Bryant</summary>' +
            '<div class="file-tree__children">' +

                fl(b, 'index.html', 'html', 'index.html (home)', '\u251C') +

                folder(b, '\u251C', 'Projects',
                    fl(b, 'projects.html', 'html', 'projects.html', '\u251C') +
                    fl(b, 'projects/gena.html', 'file', 'gena.html', '\u251C') +
                    fl(b, 'projects/visulus.html', 'file', 'visulus.html', '\u251C') +
                    fl(b, 'projects/jarvis.html', 'file', 'jarvis.html', '\u251C') +
                    fl(b, 'projects/tdash.html', 'file', 'tdash.html', '\u2514'),
                true) +

                folder(b, '\u251C', 'Personal Blog',
                    fl(b, 'blog.html', 'html', 'blog.html', '\u251C') +
                    fl(b, 'blog/europe-1.html', 'file', '#1 My Travels Through Europe So Far', '\u251C') +
                    fl(b, 'blog/europe-2.html', 'file', '#2 From Greece to Oxford', '\u251C') +
                    fl(b, 'blog/europe-3.html', 'file', '#3 Lady Margaret Hall, Oxford', '\u251C') +
                    fl(b, 'blog/europe-4.html', 'file', '#4 Last Two Weeks of Europe', '\u2514'),
                true) +

                folder(b, '\u251C', 'Assignments &amp; Writing',
                    fl(b, 'writing.html', 'html', 'writing.html', '\u251C') +
                    folder(b, '\u251C', 'Economics',
                        fl(b, 'writing/economics.html', 'html', 'economics.html', '\u251C') +
                        fl(b, 'writing/economics/essay-1.html', 'file', 'Australian economic stimulus', '\u251C') +
                        fl(b, 'writing/economics/essay-2.html', 'file', 'Monetary policy', '\u2514'),
                    false) +
                    folder(b, '\u251C', 'Physics',
                        fl(b, 'writing/physics.html', 'html', 'physics.html', '\u251C') +
                        fl(b, 'writing/physics/essay-1.html', 'file', 'Wave-particle duality', '\u251C') +
                        fl(b, 'writing/physics/essay-2.html', 'file', 'Black hole thermodynamics', '\u2514'),
                    false) +
                    folder(b, '\u251C', 'English',
                        fl(b, 'writing/english.html', 'html', 'english.html', '\u251C') +
                        fl(b, 'writing/english/essay-1.html', 'file', 'Postcolonial narratives', '\u251C') +
                        fl(b, 'writing/english/essay-2.html', 'file', 'Rhetoric and persuasion', '\u251C') +
                        fl(b, 'writing/english/essay-3.html', 'file', 'Close reading: Ishiguro', '\u2514'),
                    false) +
                    folder(b, '\u251C', 'Maths',
                        fl(b, 'writing/maths.html', 'html', 'maths.html', '\u251C') +
                        fl(b, 'writing/maths/essay-1.html', 'file', 'Fourier transforms', '\u251C') +
                        fl(b, 'writing/maths/essay-2.html', 'file', 'Linear algebra', '\u2514'),
                    false) +
                    folder(b, '\u2514', 'Geography',
                        fl(b, 'writing/geography.html', 'html', 'geography.html', '\u251C') +
                        fl(b, 'writing/geography/essay-1.html', 'file', 'Urbanisation in SEQ', '\u251C') +
                        fl(b, 'writing/geography/essay-2.html', 'file', 'Climate change and the reef', '\u251C') +
                        fl(b, 'writing/geography/essay-3.html', 'file', 'Geopolitics of water', '\u2514'),
                    false),
                true) +

                fl(b, 'resume.html', 'html', 'resume.html', '\u251C') +
                fl(b, 'contact.html', 'html', 'contact.html', '\u251C') +
                fl(b, 'help.html', 'html', 'help.html', '\u2514') +

            '</div>' +
        '</details>' +
        '</div></nav></section>';
}

function buildFooter() {
    return '<p>&copy; Ben Bryant 2026</p>';
}



/* ---- ACTIVE PAGE HIGHLIGHTING ----
   figures out which page we're on and highlights that link in the
   sidebar. also opens any parent folders so it's actually visible */
function initActivePageHighlight() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.file-tree__list a');

    links.forEach(function(link) {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const linkPage = href.split('/').pop();

        if (currentPage === linkPage || currentPath.endsWith(href)) {
            link.classList.add('file-tree__link--active');

            // walk up and open all parent <details> so link is visible
            let parent = link.closest('details');
            while (parent) {
                parent.setAttribute('open', '');
                parent = parent.parentElement.closest('details');
            }
        }
    });
}


/* ---- MOBILE MENU ----
   on mobile the sidebar is off-screen. the [=] button slides it in,
   and theres a dark overlay behind it that closes on click */
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

    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMobileMenu(sidebar, overlay, menuToggle);
        });
    }
}

function closeMobileMenu(sidebar, overlay, toggle) {
    sidebar.classList.remove('site-sidebar--open');
    if (overlay) overlay.classList.remove('sidebar-overlay--visible');
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '[=]';
    }
}


/* ---- CONTACT FORM VALIDATION ----
   custom validation instead of browser popups (novalidate on form).
   checks name/email/message, shows red border + error text below field */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return; // only on contact.html

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // no backend, just validate
        let isValid = true;

        const name = form.querySelector('#contact-name');
        const email = form.querySelector('#contact-email');
        const message = form.querySelector('#contact-message');

        clearFormErrors(form);

        if (!name.value.trim()) {
            showFieldError(name, 'ERROR: Name field cannot be empty');
            isValid = false;
        }
        if (!isValidEmail(email.value)) {
            showFieldError(email, 'ERROR: Invalid email format');
            isValid = false;
        }
        if (!message.value.trim()) {
            showFieldError(message, 'ERROR: Message field cannot be empty');
            isValid = false;
        }

        if (isValid) {
            const success = form.querySelector('.form-success');
            if (success) {
                success.classList.add('form-success--visible');
                success.textContent = '> Message sent successfully. Thank you! NOTE: not actually connected';
            }
            form.reset();
        }
    });
}

// basic email regex - just checks for something@something.something
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.trim());
}

// adds red border to field and shows error message below it
function showFieldError(field, message) {
    field.classList.add('form-input--error');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('form-error--visible');
    }
}

// wipes all error states so we start fresh each submit
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
    if (success) success.classList.remove('form-success--visible');
}


/* ---- BLOG SIGNUP ----
   same idea as contact form but simpler - just one email field */
function initSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return; // only on blog.html

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailInput = form.querySelector('#signup-email');
        const errorEl = document.getElementById('signup-error');
        const success = document.getElementById('signup-success');

        // clear previous state
        emailInput.classList.remove('form-input--error');
        if (errorEl) { errorEl.classList.remove('form-error--visible'); errorEl.textContent = ''; }
        if (success) { success.classList.remove('form-success--visible'); }

        if (!emailInput || !isValidEmail(emailInput.value)) {
            emailInput.classList.add('form-input--error');
            if (errorEl) {
                errorEl.textContent = 'ERROR: Invalid email format';
                errorEl.classList.add('form-error--visible');
            }
            return;
        }

        if (success) {
            success.classList.add('form-success--visible');
            success.textContent = '> Subscribed! You\'ll receive updates at ' + emailInput.value.trim() + ' NOTE: not actually connected';
        }
        form.reset();
    });
}


/* ---- SUBJECT TREE TOGGLE ----
   on writing pages, folder summaries have <a> links inside them.
   without this, clicking the link also toggles the folder open/closed
   because the click bubbles up to <summary>. stopPropagation fixes it */
function initSubjectTreeToggle() {
    const links = document.querySelectorAll('.subject-tree__folder > summary a');
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
}


/* ---- PANE GLOW ----
   hover effect - adds a subtle glow to whatever container the mouse
   is over. only one thing glows at a time, deepest element wins.
   structural panes (header/sidebar/main) get accent1 glow,
   nested blocks (cards/resume-blocks) get a softer accent2 glow */
function initPaneGlow() {
    const structuralSelector = '.site-header .pane, .site-sidebar .pane, .site-main .pane';
    const nestedSelector = '.card, .resume-block, .subject-tree__folder';
    const glowSelector = structuralSelector + ',' + nestedSelector;

    let currentGlow = null; // tracks what's currently glowing

    document.addEventListener('mouseover', function(event) {
        const target = event.target.closest(glowSelector); // find deepest match
        if (target === currentGlow) return; // still on the same thing

        // remove old glow
        if (currentGlow) currentGlow.classList.remove('pane-glow', 'pane-glow-nested');

        // apply new glow (different class depending on structural vs nested)
        if (target) {
            const isStructural = target.matches(structuralSelector);
            target.classList.add(isStructural ? 'pane-glow' : 'pane-glow-nested');
        }
        currentGlow = target;
    });

    // kill glow when mouse leaves the window entirely
    document.addEventListener('mouseleave', function() {
        if (currentGlow) {
            currentGlow.classList.remove('pane-glow', 'pane-glow-nested');
            currentGlow = null;
        }
    });
}


/* ---- RESUME TREE CONNECTORS ----
   draws the ├ │ └ characters next to each bullet point on the resume.
   has to measure actual content height because text wraps differently
   at different widths, and the connector needs to span all lines.
   recalculates on resize for this reason */
function initResumeTree() {
    const trees = document.querySelectorAll('.resume-tree');
    if (!trees.length) return; // only on resume.html

    function buildTreeConnectors(items, connectorSel, contentSel) {
        // first pass: reset to single char so height measurement is clean
        items.forEach(function(item) {
            const connector = item.querySelector(connectorSel);
            if (connector) connector.textContent = '\u251C ';
        });

        // second pass: measure content height, build connector string
        items.forEach(function(item, index) {
            const connector = item.querySelector(connectorSel);
            const content = item.querySelector(contentSel);
            if (!connector || !content) return;

            const isLast = index === items.length - 1;
            const lineHeight = parseFloat(getComputedStyle(connector).lineHeight);
            const contentHeight = content.offsetHeight;
            const lines = Math.max(1, Math.round(contentHeight / lineHeight));

            // first line: ├ or └ depending on position
            const branch = isLast ? '\u2514 ' : '\u251C ';
            // continuation lines: │ keeps going, space means end
            const cont = isLast ? '  ' : '\u2502 ';

            let text = branch;
            for (let i = 1; i < lines; i++) {
                text += '\n' + cont;
            }
            // spacer between items (not after the last one)
            if (!isLast) text += '\n' + cont;

            connector.textContent = text;
        });
    }

    function buildAll() {
        trees.forEach(function(tree) {
            const items = Array.from(tree.querySelectorAll(':scope > .resume-tree__item'));
            buildTreeConnectors(items, '.resume-tree__connector', '.resume-tree__content');
        });
    }

    buildAll();

    // debounced rebuild on resize (text reflow changes heights)
    let resizeTimer = null;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildAll, 150);
    });
}
