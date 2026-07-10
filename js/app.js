const QUANTIDADE_DE_FOTOS = 40;

const fotos = Array.from(
  { length: QUANTIDADE_DE_FOTOS },
  (_, indice) => `assets/fotos/foto${indice + 1}.jpg`
);

let indiceAtual = 0;
let autoplayId = null;

const carouselTrack =
  document.getElementById("carouselTrack");

const dotsContainer =
  document.getElementById("dots");

const mainPhoto =
  document.getElementById("mainPhoto");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const photoCounter =
  document.getElementById("photoCounter");

function criarSlides() {
  carouselTrack.innerHTML = "";
  dotsContainer.innerHTML = "";

  fotos.forEach((src, indice) => {
    const slide =
      document.createElement("article");

    slide.className = "slide";

    const card =
      document.createElement("div");

    card.className = "slide-card";

    const imagem =
      document.createElement("img");

    imagem.src = src;

    imagem.alt =
      `Nossa lembrança ${indice + 1}`;

    imagem.loading =
      indice === 0
        ? "eager"
        : "lazy";

    imagem.addEventListener(
      "error",
      () => {
        console.error(
          `Não foi possível carregar: ${src}`
        );
      }
    );

    card.appendChild(imagem);
    slide.appendChild(card);
    carouselTrack.appendChild(slide);

    const dot =
      document.createElement("button");

    dot.className = "dot";
    dot.type = "button";

    dot.setAttribute(
      "aria-label",
      `Ir para a foto ${indice + 1}`
    );

    dot.addEventListener(
      "click",
      () => {
        indiceAtual = indice;

        atualizarCarrossel();
        reiniciarAutoplay();
      }
    );

    dotsContainer.appendChild(dot);
  });
}

function atualizarCarrossel() {
  if (indiceAtual < 0) {
    indiceAtual =
      fotos.length - 1;
  }

  if (indiceAtual >= fotos.length) {
    indiceAtual = 0;
  }

  carouselTrack.style.transform =
    `translateX(-${indiceAtual * 100}%)`;

  atualizarFotoPrincipal();

  photoCounter.textContent =
    `${indiceAtual + 1} / ${fotos.length}`;

  const dots =
    dotsContainer.querySelectorAll(".dot");

  dots.forEach((dot, indice) => {
    dot.classList.toggle(
      "active",
      indice === indiceAtual
    );
  });

  const dotAtivo =
    dots[indiceAtual];

  if (dotAtivo) {
    dotAtivo.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }
}

function atualizarFotoPrincipal() {
  mainPhoto.classList.add("changing");

  setTimeout(() => {
    mainPhoto.src =
      fotos[indiceAtual];

    mainPhoto.alt =
      `Nossa foto ${indiceAtual + 1}`;

    mainPhoto.classList.remove("changing");
  }, 160);
}

function proximaFoto() {
  indiceAtual++;

  atualizarCarrossel();
}

function fotoAnterior() {
  indiceAtual--;

  atualizarCarrossel();
}

function iniciarAutoplay() {
  pararAutoplay();

  autoplayId = setInterval(
    proximaFoto,
    5000
  );
}

function pararAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId);
  }
}

function reiniciarAutoplay() {
  pararAutoplay();
  iniciarAutoplay();
}

prevBtn.addEventListener(
  "click",
  () => {
    fotoAnterior();
    reiniciarAutoplay();
  }
);

nextBtn.addEventListener(
  "click",
  () => {
    proximaFoto();
    reiniciarAutoplay();
  }
);

document.addEventListener(
  "keydown",
  event => {
    if (event.key === "ArrowLeft") {
      fotoAnterior();
      reiniciarAutoplay();
    }

    if (event.key === "ArrowRight") {
      proximaFoto();
      reiniciarAutoplay();
    }
  }
);

let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener(
  "touchstart",
  event => {
    touchStartX =
      event.changedTouches[0].screenX;
  },
  {
    passive: true
  }
);

carouselTrack.addEventListener(
  "touchend",
  event => {
    touchEndX =
      event.changedTouches[0].screenX;

    const distancia =
      touchStartX - touchEndX;

    if (Math.abs(distancia) < 45) {
      return;
    }

    if (distancia > 0) {
      proximaFoto();
    } else {
      fotoAnterior();
    }

    reiniciarAutoplay();
  },
  {
    passive: true
  }
);

function criarCoracoesFlutuantes() {
  const area =
    document.querySelector(
      ".floating-hearts"
    );

  const quantidade = 18;

  for (
    let indice = 0;
    indice < quantidade;
    indice++
  ) {
    const coracao =
      document.createElement("span");

    coracao.className = "heart";

    coracao.textContent =
      indice % 3 === 0
        ? "♡"
        : "♥";

    coracao.style.left =
      `${Math.random() * 100}%`;

    coracao.style.fontSize =
      `${12 + Math.random() * 18}px`;

    coracao.style.animationDuration =
      `${10 + Math.random() * 12}s`;

    coracao.style.animationDelay =
      `${Math.random() * 12}s`;

    area.appendChild(coracao);
  }
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      pararAutoplay();
    } else {
      iniciarAutoplay();
    }
  }
);

mainPhoto.addEventListener(
  "error",
  () => {
    console.error(
      `Não foi possível carregar a foto principal: ${mainPhoto.src}`
    );
  }
);

criarSlides();
criarCoracoesFlutuantes();
atualizarCarrossel();
iniciarAutoplay();
