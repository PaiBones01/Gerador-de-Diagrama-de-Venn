function parseSet(input) {
  if (!input) return new Set();
  return new Set(input.split(",").map(v => v.trim()).filter(v => v !== ""));
}

function gerarDiagrama() {
  const canvas = document.getElementById("vennCanvas");
  const ctx = canvas.getContext("2d");

  // Limpa
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pega valores
  const titulo = document.getElementById("titulo").value;
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);
  const setC = parseSet(document.getElementById("setC").value);

  // Título
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(titulo, canvas.width / 2, 30);

  // Coordenadas fixas e centralizadas
  const r = 100;
  const xA = canvas.width / 2 - 80;
  const xB = canvas.width / 2 + 80;
  const y = canvas.height / 2;
  const xC = canvas.width / 2;
  const yC = canvas.height / 2 + 90;

  ctx.globalAlpha = 0.5;

  // Círculo A
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(xA, y, r, 0, 2 * Math.PI);
  ctx.fill();

  // Círculo B
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(xB, y, r, 0, 2 * Math.PI);
  ctx.fill();

  // Círculo C
  if (setC.size > 0) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(xC, yC, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";

  // Funções de interseção
  const interAB = new Set([...setA].filter(x => setB.has(x)));
  const interAC = new Set([...setA].filter(x => setC.has(x)));
  const interBC = new Set([...setB].filter(x => setC.has(x)));
  const interABC = new Set([...interAB].filter(x => setC.has(x)));

  // Labels dos conjuntos
  ctx.fillText("A: {" + [...setA].join(",") + "}", xA, y - r - 20);
  ctx.fillText("B: {" + [...setB].join(",") + "}", xB, y - r - 20);
  if (setC.size > 0) ctx.fillText("C: {" + [...setC].join(",") + "}", xC, yC + r + 20);

  // Interseções
  ctx.fillText("A ∩ B: {" + [...interAB].join(",") + "}", canvas.width / 2, y);
  if (setC.size > 0) {
    ctx.fillText("A ∩ C: {" + [...interAC].join(",") + "}", xA, yC);
    ctx.fillText("B ∩ C: {" + [...interBC].join(",") + "}", xB, yC);
    ctx.fillText("A ∩ B ∩ C: {" + [...interABC].join(",") + "}", xC, y);
  }
}

function baixarImagem() {
  const canvas = document.getElementById("vennCanvas");
  const link = document.createElement("a");
  link.download = "diagrama_venn.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}


function gerarDiagrama() {
  const canvas = document.getElementById("vennCanvas");
  const ctx = canvas.getContext("2d");

  // Ajusta tamanho proporcional
  canvas.width = window.innerWidth - 260;
  canvas.height = window.innerHeight;

  // Limpa
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Pega valores
  const titulo = document.getElementById("titulo").value;
  const setA = parseSet(document.getElementById("setA").value);
  const setB = parseSet(document.getElementById("setB").value);
  const setC = parseSet(document.getElementById("setC").value);

  // Título
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(titulo, canvas.width / 2, 40);

  // Coordenadas proporcionais
  const r = Math.min(canvas.width, canvas.height) / 4;
  const xA = canvas.width / 2 - r * 0.8;
  const xB = canvas.width / 2 + r * 0.8;
  const y = canvas.height / 2;
  const xC = canvas.width / 2;
  const yC = canvas.height / 2 + r * 0.9;

  ctx.globalAlpha = 0.5;

  // Círculo A
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(xA, y, r, 0, 2 * Math.PI);
  ctx.fill();

  // Círculo B
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(xB, y, r, 0, 2 * Math.PI);
  ctx.fill();

  // Círculo C
  if (setC.size > 0) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(xC, yC, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";

  // Funções de interseção
  const interAB = new Set([...setA].filter(x => setB.has(x)));
  const interAC = new Set([...setA].filter(x => setC.has(x)));
  const interBC = new Set([...setB].filter(x => setC.has(x)));
  const interABC = new Set([...interAB].filter(x => setC.has(x)));

  // Desenha textos
  ctx.fillText("A: {" + [...setA].join(",") + "}", xA, y - r - 20);
  ctx.fillText("B: {" + [...setB].join(",") + "}", xB, y - r - 20);
  if (setC.size > 0) ctx.fillText("C: {" + [...setC].join(",") + "}", xC, yC + r + 20);

  // Interseções
  ctx.fillText("A ∩ B: {" + [...interAB].join(",") + "}", canvas.width / 2, y);
  if (setC.size > 0) {
    ctx.fillText("A ∩ C: {" + [...interAC].join(",") + "}", xA, yC);
    ctx.fillText("B ∩ C: {" + [...interBC].join(",") + "}", xB, yC);
    ctx.fillText("A ∩ B ∩ C: {" + [...interABC].join(",") + "}", xC, y);
  }
}

function baixarImagem() {
  const canvas = document.getElementById("vennCanvas");
  const link = document.createElement("a");
  link.download = "diagrama_venn.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// Redesenha ao redimensionar
window.onresize = gerarDiagrama;
