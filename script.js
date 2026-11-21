/* =====================================================
   WRITERS' ASSOCIATION OF THE GAMBIA
   Main JavaScript
===================================================== */

"use strict";


/* =====================================================
   1. ELEMENT REFERENCES
===================================================== */

const menuToggle = document.getElementById("menu-toggle");

const mobileNavigation = document.getElementById(
    "mobile-navigation"
);

const backToTopButton = document.getElementById(
    "back-to-top"
);

const currentYearElement = document.getElementById(
    "current-year"
);

const newsletterForm = document.getElementById(
    "newsletter-form"
);

const newsletterEmail = document.getElementById(
    "newsletter-email"
);

const newsletterMessage = document.getElementById(
    "newsletter-message"
);

const contactForm = document.getElementById(
    "contact-form"
);

const contactName = document.getElementById(
    "contact-name"
);

const contactEmail = document.getElementById(
    "contact-email"
);

const contactSubject = document.getElementById(
    "contact-subject"
);

const contactMessage = document.getElementById(
    "contact-message"
);

const messageCount = document.getElementById(
    "message-count"
);

const contactMessageStatus = document.getElementById(
    "contact-message-status"
);

const writerDialog = document.getElementById(
    "writer-dialog"
);

const writerDialogTitle = document.getElementById(
    "writer-dialog-title"
);

const writerDialogDescription = document.getElementById(
    "writer-dialog-description"
);

const dialogCloseButton = document.getElementById(
    "dialog-close"
);

const dialogContactLink = document.getElementById(
    "dialog-contact-link"
);

const toast = document.getElementById("toast");


/* =====================================================
   2. CURRENT YEAR
===================================================== */

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}


/* =====================================================
   3. MOBILE NAVIGATION
===================================================== */

function closeMobileNavigation() {
    if (!menuToggle || !mobileNavigation) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    mobileNavigation.hidden = true;

    document.body.classList.remove("menu-open");
}


function openMobileNavigation() {
    if (!menuToggle || !mobileNavigation) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    mobileNavigation.hidden = false;

    document.body.classList.add("menu-open");
}


if (menuToggle && mobileNavigation) {

    menuToggle.addEventListener("click", function () {

        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            closeMobileNavigation();
        } else {
            openMobileNavigation();
        }

    });


    const mobileNavigationLinks =
        mobileNavigation.querySelectorAll("a");

    mobileNavigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMobileNavigation();
        });

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileNavigation();
        }

    });


    document.addEventListener("click", function (event) {

        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (!isExpanded) {
            return;
        }

        const clickedInsideMenu =
            mobileNavigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMobileNavigation();
        }

    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 760) {
            closeMobileNavigation();
        }

    });

}


/* =====================================================
   4. BACK-TO-TOP BUTTON
===================================================== */

function updateBackToTopVisibility() {

    if (!backToTopButton) {
        return;
    }

    if (window.scrollY > 500) {
        backToTopButton.classList.add("is-visible");
    } else {
        backToTopButton.classList.remove("is-visible");
    }

}


window.addEventListener(
    "scroll",
    updateBackToTopVisibility,
    { passive: true }
);


updateBackToTopVisibility();


if (backToTopButton) {

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });

    });

}


/* =====================================================
   5. TOAST NOTIFICATIONS
===================================================== */

let toastTimeout = null;


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("is-visible");

    if (toastTimeout) {
        window.clearTimeout(toastTimeout);
    }

    toastTimeout = window.setTimeout(function () {

        toast.classList.remove("is-visible");

    }, 4200);

}


/* =====================================================
   6. WRITER DETAIL CONTENT
===================================================== */

/*
    These are introductory descriptions for the prototype.

    Before public launch, review all writer information against
    reliable biographies, publications, interviews, and archives.
*/

const writerProfiles = {

    lenrie: {
        name: "Lenrie Peters",

        description:
            "Lenrie Peters was a prominent Gambian poet and novelist who also pursued a career in medicine. His literary work forms an important part of Gambian and African writing. This introductory profile is intended to be expanded with verified publication details, biographical dates, and reliable archival references."
    },

    tijan: {
        name: "Tijan Sallah",

        description:
            "Tijan Sallah is a Gambian poet, writer, and scholar whose work engages with African literature, identity, history, and culture. His profile can be expanded to include a verified bibliography, selected poems and essays, interviews, and information about his contribution to African literary studies."
    },

    sally: {
        name: "Sally Singhateh",

        description:
            "Sally Singhateh is a Gambian novelist associated with contemporary Gambian writing. This profile is a starting point for a fuller literary biography featuring verified information about her published work, literary themes, awards where applicable, and contribution to the country's writing community."
    },

    ebou: {
        name: "Ebou Dibba",

        description:
            "Ebou Dibba was a Gambian novelist whose work is part of the country's literary heritage. A complete archival profile should include verified biographical details, publication information, the themes of his writing, and reliable sources documenting his life and literary contribution."
    },

    nana: {
        name: "Nana Grey-Johnson",

        description:
            "Nana Grey-Johnson is a Gambian writer and cultural figure. His profile should be developed with verified biographical information, a bibliography of published works, interviews, and reliable documentation of his contributions to Gambian literature and cultural life."
    }

};


/* =====================================================
   7. WRITER DETAIL DIALOG
===================================================== */

function openWriterDialog(writerKey) {

    if (!writerDialog) {
        return;
    }

    const profile = writerProfiles[writerKey];

    if (!profile) {
        showToast(
            "This writer's profile is not available yet."
        );

        return;
    }

    writerDialogTitle.textContent = profile.name;

    writerDialogDescription.textContent =
        profile.description;

    if (typeof writerDialog.showModal === "function") {

        writerDialog.showModal();

    } else {

        showToast(
            "Your browser does not support this profile dialog."
        );

    }

}


function closeWriterDialog() {

    if (
        writerDialog &&
        writerDialog.open
    ) {

        writerDialog.close();

    }

}


const writerLinks = document.querySelectorAll(
    ".writer-link[data-writer]"
);


writerLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const writerKey = link.dataset.writer;

        openWriterDialog(writerKey);

    });

});


if (dialogCloseButton) {

    dialogCloseButton.addEventListener(
        "click",
        closeWriterDialog
    );

}


if (writerDialog) {

    /*
        Clicking the backdrop closes the dialog.
        Clicking inside the dialog does not.
    */

    writerDialog.addEventListener("click", function (event) {

        if (event.target === writerDialog) {

            closeWriterDialog();

        }

    });


    /*
        If the contact link is used, close the dialog and
        navigate to the contact section.
    */

    if (dialogContactLink) {

        dialogContactLink.addEventListener(
            "click",
            function () {

                closeWriterDialog();

            }
        );

    }

}


/* =====================================================
   8. EMAIL VALIDATION
===================================================== */

function isValidEmail(email) {

    const normalizedEmail = email.trim();

    /*
        This is a practical front-end check, not a substitute
        for server-side email validation.
    */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailPattern.test(normalizedEmail);

}


/* =====================================================
   9. FORM MESSAGE HELPERS
===================================================== */

function setFormMessage(element, message, type) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.classList.remove(
        "is-success",
        "is-error"
    );

    if (type === "success") {

        element.classList.add("is-success");

    } else if (type === "error") {

        element.classList.add("is-error");

    }

}


/* =====================================================
   10. NEWSLETTER FORM
===================================================== */

/*
    IMPORTANT:

    This demonstration validates the email address in the
    browser only. It does not add subscribers to a mailing
    list, send an email, or save data to a server.

    A production website needs a backend or mailing-list
    integration to handle actual subscriptions.
*/

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email = newsletterEmail.value.trim();


            if (!email) {

                setFormMessage(
                    newsletterMessage,
                    "Please enter your email address.",
                    "error"
                );

                newsletterEmail.focus();

                return;

            }


            if (!isValidEmail(email)) {

                setFormMessage(
                    newsletterMessage,
                    "Please enter a valid email address.",
                    "error"
                );

                newsletterEmail.focus();

                return;

            }


            setFormMessage(
                newsletterMessage,
                "Your email passed validation. Connect a mailing-list service to activate subscriptions.",
                "success"
            );


            showToast(
                "Email validated. Newsletter delivery is not connected yet."
            );

        }
    );

}


/* =====================================================
   11. CONTACT MESSAGE CHARACTER COUNTER
===================================================== */

function updateMessageCount() {

    if (!contactMessage || !messageCount) {
        return;
    }

    const currentLength = contactMessage.value.length;

    const maximumLength =
        Number(contactMessage.getAttribute("maxlength")) || 3000;

    messageCount.textContent =
        `${currentLength} / ${maximumLength}`;

}


if (contactMessage) {

    contactMessage.addEventListener(
        "input",
        updateMessageCount
    );

}


updateMessageCount();


/* =====================================================
   12. CONTACT FORM VALIDATION
===================================================== */

/*
    IMPORTANT:

    This form validates user input in the browser.

    It does not send an email or store a contact request.
    Connect a secure backend before using this form publicly.
*/

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name = contactName.value.trim();

            const email = contactEmail.value.trim();

            const subject = contactSubject.value;

            const message = contactMessage.value.trim();


            /*
                Clear previous validation messages.
            */

            setFormMessage(
                contactMessageStatus,
                "",
                ""
            );


            /*
                Validate name.
            */

            if (name.length < 2) {

                setFormMessage(
                    contactMessageStatus,
                    "Please enter your name using at least two characters.",
                    "error"
                );

                contactName.focus();

                return;

            }


            /*
                Validate email.
            */

            if (!isValidEmail(email)) {

                setFormMessage(
                    contactMessageStatus,
                    "Please enter a valid email address.",
                    "error"
                );

                contactEmail.focus();

                return;

            }


            /*
                Validate subject.
            */

            if (!subject) {

                setFormMessage(
                    contactMessageStatus,
                    "Please select a topic for your enquiry.",
                    "error"
                );

                contactSubject.focus();

                return;

            }


            /*
                Validate message.
            */

            if (message.length < 10) {

                setFormMessage(
                    contactMessageStatus,
                    "Please enter a message containing at least 10 characters.",
                    "error"
                );

                contactMessage.focus();

                return;

            }


            /*
                Ensure message length stays within the
                specified limit.
            */

            if (message.length > 3000) {

                setFormMessage(
                    contactMessageStatus,
                    "Your message is too long. Please shorten it.",
                    "error"
                );

                contactMessage.focus();

                return;

            }


            /*
                All front-end checks have passed.

                This does not submit the message to WAG.
            */

            setFormMessage(
                contactMessageStatus,
                "Your form is valid. The website still needs a secure submission service before your message can be delivered to WAG.",
                "success"
            );


            showToast(
                "Your message passed validation. Message delivery is not connected yet."
            );

        }
    );

}


/* =====================================================
   13. CLEAR FORM ERRORS WHEN USERS EDIT INPUT
===================================================== */

if (newsletterEmail) {

    newsletterEmail.addEventListener("input", function () {

        if (
            newsletterMessage &&
            newsletterMessage.classList.contains("is-error")
        ) {

            setFormMessage(
                newsletterMessage,
                "No spam. Just stories, updates, and opportunities.",
                ""
            );

        }

    });

}


[
    contactName,
    contactEmail,
    contactSubject,
    contactMessage
].forEach(function (field) {

    if (!field) {
        return;
    }

    field.addEventListener("input", function () {

        if (
            contactMessageStatus &&
            contactMessageStatus.classList.contains("is-error")
        ) {

            setFormMessage(
                contactMessageStatus,
                "",
                ""
            );

        }

    });


    field.addEventListener("change", function () {

        if (
            contactMessageStatus &&
            contactMessageStatus.classList.contains("is-error")
        ) {

            setFormMessage(
                contactMessageStatus,
                "",
                ""
            );

        }

    });

});


/* =====================================================
   14. SMOOTH ANCHOR NAVIGATION
===================================================== */

const internalAnchorLinks = document.querySelectorAll(
    'a[href^="#"]'
);


internalAnchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const href = link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }


        /*
            The newsletter footer link points to the form ID.
            Scroll directly to the newsletter form when clicked.
        */

        if (href === "#newsletter-form") {

            const form = document.getElementById(
                "newsletter-form"
            );

            if (form) {

                event.preventDefault();

                form.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",

                    block: "center"
                });

                if (newsletterEmail) {

                    window.setTimeout(function () {

                        newsletterEmail.focus({
                            preventScroll: true
                        });

                    }, 350);

                }

            }

            return;

        }


        /*
            Allow the writer dialog to handle its own
            internal navigation.
        */

        if (
            writerDialog &&
            writerDialog.open &&
            link.closest(".writer-dialog")
        ) {

            return;

        }


        const target = document.querySelector(href);

        if (!target) {
            return;
        }


        /*
            Close the mobile menu before scrolling.
        */

        if (
            mobileNavigation &&
            !mobileNavigation.hidden
        ) {

            closeMobileNavigation();

        }

    });

});


/* =====================================================
   15. SCROLL REVEAL ANIMATIONS
===================================================== */

const reducedMotionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);


function initializeScrollReveal() {

    if (reducedMotionPreference.matches) {
        return;
    }


    const revealTargets = document.querySelectorAll(
        [
            ".about-visual",
            ".about-content",
            ".section-header",
            ".writer-card",
            ".writers-note",
            ".statement-content",
            ".story-card",
            ".editorial-notice",
            ".events-intro",
            ".event-item",
            ".membership-content",
            ".membership-side",
            ".newsletter-content",
            ".newsletter-form",
            ".contact-content",
            ".contact-form-card"
        ].join(",")
    );


    revealTargets.forEach(function (element, index) {

        element.classList.add("js-reveal");

        /*
            Stagger only nearby cards slightly.
        */

        if (
            element.classList.contains("writer-card") ||
            element.classList.contains("story-card")
        ) {

            element.style.transitionDelay =
                `${(index % 3) * 70}ms`;

        }

    });


    if (!("IntersectionObserver" in window)) {

        revealTargets.forEach(function (element) {

            element.classList.add("is-revealed");

        });

        return;

    }


    const observer = new IntersectionObserver(

        function (entries, currentObserver) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-revealed");

                currentObserver.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }

    );


    revealTargets.forEach(function (element) {

        observer.observe(element);

    });

}


initializeScrollReveal();


/* =====================================================
   16. IMAGE FALLBACK
===================================================== */

/*
    If an external image cannot load, use a neutral visual
    fallback rather than leaving a broken-image icon.

    Replace the image URL in HTML if a particular photograph
    is unavailable or unsuitable.
*/

const websiteImages = document.querySelectorAll("img");


websiteImages.forEach(function (imageElement) {

    imageElement.addEventListener(
        "error",
        function () {

            imageElement.classList.add("image-unavailable");

            imageElement.alt =
                imageElement.alt ||
                "Image unavailable";

            imageElement.style.opacity = "0.35";

        },
        { once: true }
    );

});


/* =====================================================
   17. CONSOLE INITIALIZATION MESSAGE
===================================================== */

console.info(
    "WAG website initialized. Front-end prototype loaded successfully."
);

console.info(
    "Reminder: contact delivery, newsletter subscriptions, real events, and verified editorial content must be connected or completed before production."
);