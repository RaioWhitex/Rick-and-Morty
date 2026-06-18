const grid = document.getElementById("grid");
const statusCarregamento = document.getElementById("status-carregamento");

// Nomes exatos que aparecem nas imagens enviadas, nesta ordem.
// (São os primeiros personagens em ordem alfabética na API oficial.)
const nomesDesejados = [
  "Rick Sanchez", "Morty Smith", "Summer Smith", "Beth Smith", "Jerry Smith",
  "Abadango Cluster Princess", "Abradolf Lincler", "Adjudicator Rick",
  "Agency Director", "Alan Rails", "Albert Einstein", "Alexander",
  "Alien Googah", "Alien Morty", "Alien Rick", "Amish Cyborg", "Annie",
  "Antenna Morty", "Antenna Rick", "Ants in my Eyes Johnson", "Aqua Morty",
  "Aqua Rick", "Arcade Alien", "Armagheadon", "Armothy", "Arthricia",
  "Artist Morty", "Attila Starwar", "Baby Legs", "Baby Poopybutthole",
  "Baby Wizard", "Bearded Lady", "Beebo", "Benjamin", "Bepisian",
  "Beth Sanchez", "Beth Smith", "Beth's Mytholog"
];

// IDs 1 a 38 da API correspondem exatamente a esses personagens (ordem alfabética)
const API = "https://rickandmortyapi.com/api/character/" +
  Array.from({ length: 38 }, (_, i) => i + 1).join(",");

function criarCard(p) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}" loading="lazy">
    <p class="nome">${p.name}</p>
    <p class="info"><span class="icone">〰️</span> ${p.status}</p>
    <p class="info"><span class="icone">👽</span> ${p.species}</p>
    <p class="info"><span class="icone">🌍</span> ${p.origin.name}</p>
  `;
  return card;
}

async function carregar() {
  try {
    const resposta = await fetch(API);
    const dados = await resposta.json();
    const lista = Array.isArray(dados) ? dados : [dados];

    // Garante que só apareçam os personagens das fotos, nem mais nem menos
    lista
      .filter(p => nomesDesejados.includes(p.name))
      .forEach(p => grid.appendChild(criarCard(p)));

    statusCarregamento.style.display = "none";
  } catch (erro) {
    statusCarregamento.textContent =
      "Não foi possível carregar os personagens. Use um servidor local ou publique a página online.";
  }
}

carregar();
