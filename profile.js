const PROJECTS = [
  {
    title: "Transaction tracker",
    image: "images/task.png",
    description:
      "Responsive task management application with add, edit, delete, search and local storage.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://chahat9502-crypto.github.io/transaction-trek/",
    github: "https://github.com/chahat9502-crypto/transaction-trek.git",
  },

  {
    title: "To-Do List",
    image: "images/todo-list.png",
    description:
      "Simple and responsive to-do list application with add, edit, delete and completed task features.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://chahat9502-crypto.github.io/To-do-list-application/",
    github: "https://github.com/chahat9502-crypto/To-do-list-application.git",
  },

  {
    title: "Responsive My Blog Website",
    image: "images/myblog.png",
    description:
      "Responsive blog website with articles, categories, search, dark interface and modern responsive design.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://chahat9502-crypto.github.io/A-responsive-My-Blog-Website/",
    github: "https://github.com/chahat9502-crypto/A-responsive-My-Blog-Website.git"
  },


];

const $ = (selector, parent = document) => {
  return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
  return [...parent.querySelectorAll(selector)];
};

const projectsGrid = $("#projectsGrid");

function showProjects() {

  if (!projectsGrid) return;

  projectsGrid.innerHTML = PROJECTS.map((project, index) => {

    return `

      <article
        class="project-card reveal"
        data-index="${index}"
      >

        <div class="project-image-wrap">

          <img
            class="project-image"
            src="${project.image}"
            alt="${project.title}"
            loading="lazy"
          >

          <div class="project-number">
            ${String(index + 1).padStart(2, "0")}
          </div>

        </div>


        <div class="project-body">

          <div class="tags">

            ${project.tags.map(tag => `
              <span class="tag">${tag}</span>
            `).join("")}

          </div>


          <h3>
            ${project.title}
          </h3>


          <p>
            ${project.description}
          </p>


          <div class="project-links">

            <a
              href="${project.live}"
              class="project-link"
              ${project.live !== "#"
                ? 'target="_blank" rel="noopener noreferrer"'
                : ""}
            >
              <span>↗</span>
              Live Demo
            </a>


            <a
              href="${project.github}"
              class="project-link"
              ${project.github !== "#"
                ? 'target="_blank" rel="noopener noreferrer"'
                : ""}
            >
              <span>◉</span>
              GitHub
            </a>

          </div>

        </div>

      </article>

    `;

  }).join("");

}

showProjects();


/* =========================================================
   PROJECT FILTERS
========================================================= */
$$('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    $$('.filter-btn').forEach(btn => btn.classList.toggle('active', btn === button));

    $$('.project-card').forEach(card => {
      const index = Number(card.dataset.index);
      const project = PROJECTS[index];
      const visible = filter === 'all' || (project && project.tags.includes(filter));
      card.style.display = visible ? '' : 'none';
    });
  });
});
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

function closeMenu() {

  if (!navLinks || !menuToggle) return;

  navLinks.classList.remove("open");

  menuToggle.textContent = "☰";

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

}


if (menuToggle && navLinks) {

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );


  menuToggle.addEventListener("click", () => {

    const opened =
      navLinks.classList.toggle("open");

    menuToggle.textContent =
      opened ? "✕" : "☰";

    menuToggle.setAttribute(
      "aria-expanded",
      String(opened)
    );

  });


  $$(".nav-link").forEach(link => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  document.addEventListener("click", event => {

    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {

      closeMenu();

    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {

      closeMenu();

    }

  });

}

$$('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const id =
      link.getAttribute("href");

    if (!id || id === "#") return;

    const target =
      document.querySelector(id);

    if (!target) return;

    event.preventDefault();

    const header =
      $(".header");

    const offset =
      header
        ? header.offsetHeight + 10
        : 80;

    window.scrollTo({

      top:
        target.getBoundingClientRect().top +
        window.scrollY -
        offset,

      behavior: "smooth"

    });

  });

});

const sections =
  $$("section[id]");

const backTop =
  $("#backTop");


function updateScrollUI() {

  const scrollY =
    window.scrollY;

  let current = "";


  sections.forEach(section => {

    const top =
      section.offsetTop - 180;

    if (scrollY >= top) {

      current =
        section.id;

    }

  });


  $$(".nav-link").forEach(link => {

    link.classList.toggle(

      "active",

      link.getAttribute("href") ===
      `#${current}`

    );

  });


  if (backTop) {

    backTop.classList.toggle(
      "show",
      scrollY > 500
    );

  }


  document.body.classList.toggle("scrolled", scrollY > 20);
  const header = $(".header");
  if (header) header.classList.toggle("scrolled", scrollY > 20);

}


window.addEventListener(
  "scroll",
  updateScrollUI,
  { passive: true }
);

updateScrollUI();

if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}

const revealItems =
  $$(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "show"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {

        threshold: 0.12,

        rootMargin:
          "0px 0px -40px 0px"

      }

    );


  revealItems.forEach(item => {

    revealObserver.observe(item);

  });

} else {

  revealItems.forEach(item => {

    item.classList.add("show");

  });

}

const skillBars =
  $$(".progress span");


if ("IntersectionObserver" in window) {

  const skillObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "animated"
            );

            skillObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.4
      }

    );


  skillBars.forEach(bar => {

    skillObserver.observe(bar);

  });

}
const typingText =
  $("#typingText");


if (typingText) {

  const words = [

    "Developer",
    "Web Creator",
    "Frontend Devloper"

  ];


  let wordIndex = 0;

  let charIndex =
    words[0].length;

  let deleting = true;


  function typeLoop() {

    const word =
      words[wordIndex];


    if (!deleting) {

      charIndex++;

      typingText.textContent =
        word.slice(0, charIndex);


      if (
        charIndex >= word.length
      ) {

        deleting = true;

        setTimeout(
          typeLoop,
          1300
        );

        return;

      }


      setTimeout(
        typeLoop,
        75
      );

    } else {

      charIndex--;


      typingText.textContent =
        word.slice(0, charIndex);


      if (charIndex <= 0) {

        deleting = false;

        wordIndex =
          (wordIndex + 1) %
          words.length;


        setTimeout(
          typeLoop,
          250
        );

        return;

      }


      setTimeout(
        typeLoop,
        45
      );

    }

  }


  setTimeout(
    typeLoop,
    1200
  );

}
const finePointer =
  window.matchMedia(
    "(pointer:fine)"
  );


if (finePointer.matches) {

  document.body.classList.add(
    "has-pointer"
  );


  window.addEventListener(
    "pointermove",
    event => {

      document.documentElement.style.setProperty(

        "--mouse-x",

        `${event.clientX}px`

      );


      document.documentElement.style.setProperty(

        "--mouse-y",

        `${event.clientY}px`

      );

    },

    { passive: true }

  );

}

function addProjectTilt() {

  if (!finePointer.matches) return;


  $$(".project-card").forEach(card => {


    card.addEventListener(
      "pointermove",
      event => {

        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const rotateY =
          ((x / rect.width) - 0.5) * 7;


        const rotateX =
          ((y / rect.height) - 0.5) * -7;


        card.style.setProperty(
          "--card-x",
          `${x}px`
        );


        card.style.setProperty(
          "--card-y",
          `${y}px`
        );


        card.style.transform = `

          perspective(900px)

          rotateX(${rotateX}deg)

          rotateY(${rotateY}deg)

          translateY(-8px)

        `;

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.transform = "";

      }
    );


  });

}


addProjectTilt();

function animateProjectCards() {

  const cards =
    $$(".project-card");


  cards.forEach(
    (card, index) => {

      card.animate(

        [

          {

            opacity: 0,

            transform:
              "translateY(35px) scale(.96)"

          },

          {

            opacity: 1,

            transform:
              "translateY(0) scale(1)"

          }

        ],

        {

          duration: 650,

          delay:
            index * 90,

          easing:
            "cubic-bezier(.2,.8,.2,1)",

          fill: "both"

        }

      );

    }
  );


  addProjectTilt();

}


animateProjectCards();

if (finePointer.matches) {

  $$(".project-card").forEach(card => {

    const image =
      $(".project-image", card);


    if (!image) return;


    card.addEventListener(
      "pointermove",
      event => {

        const rect =
          card.getBoundingClientRect();


        const x =
          (
            (
              event.clientX -
              rect.left
            ) /
            rect.width -
            0.5
          ) * 10;


        const y =
          (
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            0.5
          ) * 8;


        image.style.transform = `

          scale(1.08)

          translate(
            ${x}px,
            ${y}px
          )

        `;

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        image.style.transform = "";

      }
    );

  });

}


const contactForm =
  $("#contactForm");


if (contactForm) {

  const fields = {

    name: $("#name"),

    email: $("#email"),

    subject: $("#subject"),

    message: $("#message")

  };


  const errors = {

    name: $("#nameError"),

    email: $("#emailError"),

    subject: $("#subjectError"),

    message: $("#messageError")

  };


  const status =
    $("#formStatus");


  function clearErrors() {

    Object.values(errors)
      .forEach(error => {

        if (error) {

          error.textContent =
            "";

        }

      });


    Object.values(fields)
      .forEach(field => {

        if (field) {

          field.classList.remove(
            "input-error"
          );

          field.classList.remove(
            "input-success"
          );

        }

      });


    if (status) {

      status.textContent =
        "";

      status.className =
        "form-status";

    }

  }


  function setError(
    fieldName,
    message
  ) {

    const field =
      fields[fieldName];


    const error =
      errors[fieldName];


    if (field) {

      field.classList.add(
        "input-error"
      );

    }


    if (error) {

      error.textContent =
        message;

    }

  }


  Object.values(fields)
    .forEach(field => {

      if (!field) return;


      field.addEventListener(
        "input",
        () => {

          field.classList.remove(
            "input-error"
          );


          const error =
            errors[field.id];


          if (error) {

            error.textContent =
              "";

          }

        }
      );

    });


  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      clearErrors();


      const name =
        fields.name.value.trim();


      const email =
        fields.email.value.trim();


      const subject =
        fields.subject.value.trim();


      const message =
        fields.message.value.trim();


      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      let valid = true;


      if (name.length < 2) {

        setError(
          "name",
          "Please enter your name."
        );

        valid = false;

      }


      if (
        !emailPattern.test(email)
      ) {

        setError(
          "email",
          "Please enter a valid email."
        );

        valid = false;

      }


      if (subject.length < 3) {

        setError(
          "subject",
          "Please enter a subject."
        );

        valid = false;

      }


      if (message.length < 10) {

        setError(
          "message",
          "Message must contain at least 10 characters."
        );

        valid = false;

      }


      if (!valid) {

        const firstError =
          $(".input-error");


        if (firstError) {

          firstError.focus();

        }

        return;

      }


      Object.values(fields)
        .forEach(field => {

          if (field) {

            field.classList.add(
              "input-success"
            );

          }

        });


      if (status) {

        status.textContent =
          "✓ Message validated successfully!";

        status.classList.add(
          "success"
        );

      }


      contactForm.reset();


      setTimeout(
        () => {

          Object.values(fields)
            .forEach(field => {

              if (field) {

                field.classList.remove(
                  "input-success"
                );

              }

            });

        },

        1200

      );

    }

  );

}


/* =========================================================
   16. INPUT FOCUS ANIMATION
========================================================= */

$$(
  ".form-group input, .form-group textarea"
).forEach(input => {

  input.addEventListener(
    "focus",
    () => {

      input.parentElement.classList.add(
        "focused"
      );

    }
  );


  input.addEventListener(
    "blur",
    () => {

      input.parentElement.classList.remove(
        "focused"
      );

    }
  );

});


const heroImage =
  $(".hero-image img");


if (
  heroImage &&
  finePointer.matches
) {

  heroImage.addEventListener(
    "pointermove",
    event => {

      const rect =
        heroImage.getBoundingClientRect();


      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5;


      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5;


      heroImage.style.transform = `

        perspective(800px)

        rotateY(${x * 5}deg)

        rotateX(${y * -5}deg)

        scale(1.03)

      `;

    }
  );


  heroImage.addEventListener(
    "pointerleave",
    () => {

      heroImage.style.transform =
        "";

    }
  );

}



/* =========================================================
   RESUME VIEW + FORCE DOWNLOAD FIX
========================================================= */

const viewResumeBtn = $("#viewResumeBtn");

if (viewResumeBtn) {
  viewResumeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const resumeUrl = viewResumeBtn.getAttribute("href");
    const absoluteResumeUrl = new URL(resumeUrl, window.location.href).href;

    const newTab = window.open(absoluteResumeUrl, "_blank", "noopener,noreferrer");

    // Fallback: if browser blocks the new tab, open the PDF in the current tab.
    if (!newTab) {
      window.location.href = absoluteResumeUrl;
    }
  });
}

const downloadResumeBtn = $("#downloadResumeBtn");

if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const resumeUrl = downloadResumeBtn.getAttribute("href");
    const fileName = downloadResumeBtn.getAttribute("download") || "Chahat-Singh-Resume.pdf";

    try {
      const response = await fetch(resumeUrl, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Resume file not found");
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");

      tempLink.href = blobUrl;
      tempLink.download = fileName;
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      alert("Resume file nahi mili. Check karo ki resume.pdf portfolio.html ke same folder me hai.");
    }
  });
}

$$('a[download]').forEach(button => {

  button.addEventListener(
    "mouseenter",
    () => {

      button.animate(

        [

          {
            transform:
              "translateY(0)"
          },

          {
            transform:
              "translateY(-3px)"
          },

          {
            transform:
              "translateY(0)"
          }

        ],

        {

          duration: 450,

          easing:
            "ease-out"

        }

      );

    }
  );

});

$$(".social-links a")
  .forEach(link => {

    link.addEventListener(
      "mouseenter",
      () => {

        link.animate(

          [

            {
              transform:
                "translateY(0)"
            },

            {
              transform:
                "translateY(-4px)"
            },

            {
              transform:
                "translateY(0)"
            }

          ],

          {

            duration: 400,

            easing:
              "ease-out"

          }

        );

      }
    );

  });

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

    }

  }
);
window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );


    setTimeout(
      () => {

        $$(".hero-content > *")
          .forEach(
            (item, index) => {

              item.animate(

                [

                  {

                    opacity: 0,

                    transform:
                      "translateY(20px)"

                  },

                  {

                    opacity: 1,

                    transform:
                      "translateY(0)"

                  }

                ],

                {

                  duration: 600,

                  delay:
                    index * 90,

                  easing:
                    "cubic-bezier(.2,.8,.2,1)",

                  fill: "both"

                }

              );

            }
          );

      },

      150

    );

  }

);

const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


if (reduceMotion.matches) {

  document.documentElement.classList.add(
    "reduce-motion"
  );

}
