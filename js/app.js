const fotosIniciais = [
  "assets/fotos/foto1.jpg",
  "assets/fotos/foto2.jpg",
  "assets/fotos/foto3.jpg",
  "assets/fotos/foto4.jpg",
  "assets/fotos/foto5.jpg",
  "assets/fotos/foto6.jpg",
  "assets/fotos/foto7.jpg",
  "assets/fotos/foto8.jpg"
];

let fotos = [...fotosIniciais];
let indiceAtual = 0;
let autoPlayId = null;

const track = document.getElementById("carouselTrack");
const dots = document.getElementById("dots");
const mainPhoto = document.getElementById("mainPhoto");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const uploadBtn = document.getElementById("uploadBtn");
const photoInput = document.getElementById("photoInput");
const toast = document.getElementById("toast");

function criarSlides() {
  track.innerHTML = "";
  dots.innerHTML = "";

  fotos.forEach((src, index) => {
    const slide = document.createElement("article");
    slide.className = "slide";

    const card = document.createElement("div");
    card.className = "slide-card";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Nossa lembrança ${index + 1}`;
    img.loading = index === 0 ? "eager" : "lazy";

    img.addEventListener("click", () => {
      indiceAtual = index;
      atualizarCarrossel();
      mainPhoto.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    card.appendChild(img);
    slide.appendChild(card);
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para a foto ${index + 1}`);
    dot.addEventListener("click", () => {
      indiceAtual = index;
      atualizarCarrossel();
      reiniciarAutoplay();
    });

    dots.appendChild(dot);
  });

  atualizarCarrossel();
}

function atualizarCarrossel() {
  if (!fotos.length) return;

  if (indiceAtual < 0) indiceAtual = fotos.length - 1;
  if (indiceAtual >= fotos.length) indiceAtual = 0;

  track.style.transform = `translateX(-${indiceAtual * 100}%)`;
  mainPhoto.src = fotos[indiceAtual];

  [...dots.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === indiceAtual);
  });
}

function proximaFoto() {
  indiceAtual += 1;
  atualizarCarrossel();
}

function fotoAnterior() {
  indiceAtual -= 1;
  atualizarCarrossel();
}

function iniciarAutoplay() {
  pararAutoplay();
  autoPlayId = setInterval(proximaFoto, 5000);
}

function pararAutoplay() {
  if (autoPlayId) clearInterval(autoPlayId);
}

function reiniciarAutoplay() {
  pararAutoplay();
  iniciarAutoplay();
}

function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add("show");

  clearTimeout(mostrarToast.timeout);
  mostrarToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

prevBtn.addEventListener("click", () => {
  fotoAnterior();
  reiniciarAutoplay();
});

nextBtn.addEventListener("click", () => {
  proximaFoto();
  reiniciarAutoplay();
});

uploadBtn.addEventListener("click", () => photoInput.click());

photoInput.addEventListener("change", (event) => {
  const arquivos = [...event.target.files].filter(file =>
    file.type.startsWith("image/")
  );

  if (!arquivos.length) return;

  const novasFotos = arquivos.map(file => URL.createObjectURL(file));
  fotos = novasFotos;
  indiceAtual = 0;
  criarSlides();
  reiniciarAutoplay();

  mostrarToast(`${novasFotos.length} foto(s) adicionada(s) 💗`);
});

let touchStartX = 0;
let touchEndX = 0;

track.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener("touchend", event => {
  touchEndX = event.changedTouches[0].screenX;
  const distancia = touchStartX - touchEndX;

  if (Math.abs(distancia) > 45) {
    distancia > 0 ? proximaFoto() : fotoAnterior();
    reiniciarAutoplay();
  }
}, { passive: true });

function criarCoracoesFlutuantes() {
  const area = document.querySelector(".floating-hearts");

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = i % 3 === 0 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${10 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 12}s`;
    area.appendChild(heart);
  }
}

document.addEventListener("visibilitychange", () => {
  document.hidden ? pararAutoplay() : iniciarAutoplay();
});

criarSlides();
criarCoracoesFlutuantes();
iniciarAutoplay();
