// get landing Page
let landingPage = document.querySelector(".landingPage");

// Array Of Img
let imgArray = [
  "landing-0.jpg",
  "landing-1.jpg",
  "landing-2.jpg",
  "landing-3.jpg",
  "landing-4.jpg",
];

// change BackGround Url

let BackGroundOption = true;

let controlInterval;

function randomizeImg() {
  if (BackGroundOption === true) {
    controlInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = `url("img/landing-${randomNum}.jpg")`;
    }, 3000);
  }
}

randomizeImg();

// Toggle Spin Icon

document.querySelector(".spin .cona").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settingBox").classList.toggle("open");
};

// Switch Color

let colorLi = document.querySelectorAll(".colorList li");

colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color in root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color In localStorage
    localStorage.setItem("colorOp", e.target.dataset.color);

    handleActive(e);
  });
});

// Check If There Is Color In LocalStorage

let mainColor = localStorage.getItem("colorOp");

if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("colorOp")
  );

  // Remove Active Class From All Children
  document.querySelectorAll(".colorList li").forEach((el) => {
    el.classList.remove("active");

    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}

// Check If There Is Random Background In LocalStorage

let backgroundLocalItem = localStorage.getItem("bgOption");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    BackGroundOption = true;
  } else {
    BackGroundOption = false;
  }
  //   Remove Active Class
  document.querySelectorAll(".randBg span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".randBg .yes").classList.add("active");
  } else {
    document.querySelector(".randBg .no").classList.add("active");
  }
}

// Switch Random Back Ground Option

let randomEle = document.querySelectorAll(".randBg span");

// Loop on All Spans
randomEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background == "yes") {
      BackGroundOption = true;
      randomizeImg();
      localStorage.setItem("bgOption", true);
    } else {
      BackGroundOption = false;
      clearInterval(controlInterval);
      localStorage.setItem("bgOption", false);
    }
  });
});

// Progress

let skills = document.querySelector(".skills");

window.onscroll = function () {
  // offset Top
  let skillOffsetTop = skills.offsetTop;

  // offset Height
  let skillOuterHeight = skills.offsetHeight;

  // Window Height
  let WindowHeight = this.innerHeight;

  // Window Scroll Top
  let WindowScrollTop = this.scrollY;

  let all = skillOffsetTop + skillOuterHeight - WindowHeight;

  if (WindowScrollTop >= all) {
    let allSkills = document.querySelectorAll(".skillsBox .skillProg span");
    allSkills.forEach((el) => {
      el.style.width = el.dataset.prog;
    });
  }

  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Create Pop Up With Img

let gallery = document.querySelectorAll(".gallery img");

gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overLay
    let overLay = document.createElement("div");
    overLay.className = "popUpOverLay";
    document.body.appendChild(overLay);

    // Create Pop Up
    let popUpBox = document.createElement("div");
    popUpBox.className = "popUpBox";

    // Add Heading
    if (img.alt !== null) {
      // Set Default alt
      if (!img.alt || img.alt.trim() === "") {
        img.alt = "Img Name";
      }

      // Create H2
      let heading = document.createElement("h2");
      let headingText = document.createTextNode(img.alt);

      heading.appendChild(headingText);
      popUpBox.appendChild(heading);
    }

    // Create Img
    let popUpImg = document.createElement("img");

    // Set img Src
    popUpImg.src = img.src;

    popUpBox.appendChild(popUpImg);

    document.body.appendChild(popUpBox);

    // Create Close Span
    let closeBtn = document.createElement("span");
    closeBtn.className = "closeBtn";
    let x = document.createTextNode("X");
    closeBtn.appendChild(x);

    popUpBox.appendChild(closeBtn);
  });
});

// Close Pop Up

document.addEventListener("click", (e) => {
  if (e.target.className == "closeBtn") {
    // remove Current pop up
    e.target.parentNode.remove();

    // remove OverLay
    document.querySelector(".popUpOverLay").remove();
  }
});

// Select All Bullets

let allBullets = document.querySelectorAll(".navBullets .bullets");

// Select All Links

let allLinks = document.querySelectorAll(".landingPage .links li a");

function moveTo(element) {
  element.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.sec).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

moveTo(allLinks);
moveTo(allBullets);

// Go To Top

let scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function handleActive(event) {
  // Remove Active Class From All Children
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  // Add Active Class To Current Child
  event.target.classList.add("active");
}

// Select Bullets Span

let bulletSpan = document.querySelectorAll(".bullOp span");
let bullContainer = document.querySelector(".navBullets");
let bullLocal = localStorage.getItem("bullOp");

if (bullLocal !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bullLocal === "block") {
    bullContainer.style.display = "block";
    document.querySelector(".bullOp .yes").classList.add("active");
  } else {
    bullContainer.style.display = "none";
    document.querySelector(".bullOp .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bullContainer.style.display = "block";
      localStorage.setItem("bullOp", "block");
    } else {
      bullContainer.style.display = "none";
      localStorage.setItem("bullOp", "none");
    }
    handleActive(e);
  });
});

// Reset Option

document.querySelector(".resetOp").onclick = function () {
  // localStorage.clear()
  localStorage.removeItem("colorOp");
  localStorage.removeItem("bgOption");
  localStorage.removeItem("bullOp");

  window.location.reload();
};

// Toggle Menu

let toggleBtn = document.querySelector(".toggleMenu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menuActive");
  tLinks.classList.toggle("open");
};

// Click Any Where to Close the Menu

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menuActive");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
