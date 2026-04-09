// ========== DADOS ==========
const materiais = [
  { nome: "Granito Preto São Gabriel", tag: "Nacional · Cozinha", preco: 320, imagem: "https://placehold.co/400x300/1a1a1a/fff?text=Preto+São+Gabriel" },
  { nome: "Granito Branco Siena", tag: "Nacional · Alta Demanda", preco: 290, imagem: "https://placehold.co/400x300/e8e4df/000?text=Branco+Siena" },
  { nome: "Mármore Calacatta", tag: "Importado · Premium", preco: 780, imagem: "https://placehold.co/400x300/f5f2ed/000?text=Calacatta" },
  { nome: "Quartzo Cinza Cimento", tag: "Industrializado", preco: 650, imagem: "https://placehold.co/400x300/b0aaa4/fff?text=Cinza+Cimento" },
  { nome: "Travertino Romano", tag: "Importado · Clássico", preco: 520, imagem: "https://placehold.co/400x300/d4c4a8/000?text=Travertino" },
  { nome: "Pedra Ferro", tag: "Nacional · Contemporâneo", preco: 480, imagem: "https://placehold.co/400x300/3a3a3a/fff?text=Pedra+Ferro" },
  { nome: "Granito Verde Ubatuba", tag: "Nacional · Econômico", preco: 260, imagem: "https://placehold.co/400x300/2a3a2a/fff?text=Verde+Ubatuba" },
  { nome: "Quartzo Statuário", tag: "Importado · Exclusivo", preco: 890, imagem: "https://placehold.co/400x300/f8f5f0/000?text=Statuario" }
];

const projetos = [
  { titulo: "Bancada Calacatta", desc: "Cozinha em Jacarepaguá", imagem: "https://placehold.co/600x400/cbbcaa/4a3e34?text=Projeto+1" },
  { titulo: "Granito Preto", desc: "Cozina clean", imagem: "https://placehold.co/600x400/b5a58f/4a3e34?text=Projeto+2" },
  { titulo: "Travertino Romano", desc: "Banheiro com cobogó", imagem: "https://placehold.co/600x400/d6cbbc/4a3e34?text=Projeto+3" },
  { titulo: "Quartzo Cinza", desc: "Revestimento de parede", imagem: "https://placehold.co/600x400/c1b19b/4a3e34?text=Projeto+4" },
  { titulo: "Mármore Branco", desc: "Lavabo elegante", imagem: "https://placehold.co/600x400/f0e6d8/4a3e34?text=Projeto+5" }
];

const posts = [
  { titulo: "Tendências para cozinhas 2026", resumo: "Materiais e cores que vão dominar", imagem: "https://placehold.co/600x400/e8dfd3/5a4d42?text=Tendências" },
  { titulo: "Como escolher o mármore ideal", resumo: "Guia completo para sua bancada", imagem: "https://placehold.co/600x400/d6cbbc/5a4d42?text=Guia" },
  { titulo: "Cobogó + Pedra natural", resumo: "Duo perfeito para projetos brasileiros", imagem: "https://placehold.co/600x400/c1b19b/5a4d42?text=Cobogó" }
];

// ========== FUNÇÕES DE RENDER ==========
function renderizarMateriais(containerId, limite = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const lista = limite ? materiais.slice(0, limite) : materiais;
  container.innerHTML = lista.map(m => `
    <div class="card">
      <img src="${m.imagem}" alt="${m.nome}">
      <div class="card-info">
        <h3>${m.nome}</h3>
        <p>${m.tag}</p>
        <p>A partir de R$ ${m.preco}/m²</p>
      </div>
    </div>
  `).join('');
}

function renderizarProjetos(containerId, limite = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const lista = limite ? projetos.slice(0, limite) : projetos;
  container.innerHTML = lista.map(p => `
    <div class="project-card" onclick="openLightbox('${p.imagem}')">
      <img src="${p.imagem}" alt="${p.titulo}">
      <div class="card-info">
        <h3>${p.titulo}</h3>
        <p>${p.desc}</p>
      </div>
    </div>
  `).join('');
}

function renderizarPosts() {
  const container = document.getElementById("posts");
  if (!container) return;
  container.innerHTML = posts.map(p => `
    <div class="project-card">
      <img src="${p.imagem}" alt="${p.titulo}">
      <div class="card-info">
        <h3>${p.titulo}</h3>
        <p>${p.resumo}</p>
      </div>
    </div>
  `).join('');
}

// ========== LIGHTBOX ==========
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
function openLightbox(src) {
  if (!lightbox) return;
  lightbox.classList.add("active");
  lightboxImg.src = src;
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightboxImg.src = "";
}
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("close-lightbox")) closeLightbox();
  });
}

// ========== FORMULÁRIO (WhatsApp) ==========
const form = document.getElementById("contatoForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const tel = document.getElementById("tel").value;
    const servico = document.getElementById("servico").value;
    const msg = document.getElementById("mensagem").value;
    const texto = `Olá! Sou ${nome}. Serviço: ${servico}. ${msg ? "Detalhes: "+msg : ""}. Fone: ${tel}`;
    window.open(`https://wa.me/5521999990000?text=${encodeURIComponent(texto)}`, "_blank");
    alert("Mensagem encaminhada para o WhatsApp! Em breve retornamos.");
    form.reset();
  });
}

// ========== INICIALIZAÇÃO POR PÁGINA ==========
document.addEventListener("DOMContentLoaded", () => {
  // Página inicial
  renderizarMateriais("materiais-destaque", 4);
  renderizarProjetos("projetos-recentes", 3);
  
  // Página de projetos
  renderizarProjetos("todos-projetos");
  
  // Página de materiais
  renderizarMateriais("todos-materiais");
  
  // Página de inspirações
  renderizarPosts();
});
