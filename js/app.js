const materiais = [
  { nome: "Granito Preto São Gabriel" },
  { nome: "Mármore Calacatta" },
  { nome: "Quartzo Branco" }
];

const container = document.getElementById("materiais");

materiais.forEach(m => {
  const div = document.createElement("div");
  div.innerText = m.nome;
  container.appendChild(div);
});

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const tel = document.getElementById("tel").value;

  const link = `https://wa.me/55${tel}?text=${encodeURIComponent(
    `Nome: ${nome}`
  )}`;

  window.open(link, "_blank");
});
