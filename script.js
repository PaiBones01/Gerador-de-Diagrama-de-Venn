function parseConjuntos(input) {
  const conjuntos = {};
  const linhas = input.split("\n");

  linhas.forEach(linha => {
    const match = linha.match(/^(\w+)\s*=\s*\{([^}]*)\}$/);
    if (match) {
      const nome = match[1];
      const elementos = match[2].split(",").map(v => v.trim()).filter(v => v !== "");
      conjuntos[nome] = new Set(elementos);
    }
  });

  return conjuntos;
}

function ajustarFonte(ctx, texto, maxWidth) {
  let fontSize = 16;
  do {
    ctx.font = `${fontSize}px Arial`;
    fontSize--;
  } while (ctx.measureText(texto).width > maxWidth && fontSize > 8);
}

function gerarDiagrama() {
  const canvas = document.getElementById("vennCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth - 300;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const conjuntos = parseConjuntos(document.getElementById("conjuntos").value);
  const nomes = Object.keys(conjuntos);

  if (nomes.length < 2) {
    alert("Insira pelo menos dois conjuntos.");
    return;
  }

  const r = Math.min(canvas.width, canvas.height) / 4;
  const xA = canvas.width / 2 - r * 0.8;
  const xB = canvas.width / 2 + r * 0.8;
  const y = canvas.height / 2;
  const xC = canvas.width / 2;
  const yC = canvas.height / 2 + r * 0.9;

  ctx.globalAlpha = 0.5;

  // Círculos
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(xA, y, r, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(xB, y, r, 0, 2 * Math.PI);
  ctx.fill();

  if (nomes.length >= 3) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(xC, yC, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";

  // Interseções
  const setA = conjuntos[nomes[0]] || new Set();
  const setB = conjuntos[nomes[1]] || new Set();
  const setC = conjuntos[nomes[2]] || new Set();

  const interAB = new Set([...setA].filter(x => setB.has(x)));
  const interAC = new Set([...setA].filter(x => setC.has(x)));
  const interBC = new Set([...setB].filter(x => setC.has(x)));
  const interABC = new Set([...interAB].filter(x => setC.has(x)));

  // Desenha textos dentro das regiões
  ajustarFonte(ctx, [...setA].join(","), r);
  ctx.fillText([...setA].join(","), xA, y);

  ajustarFonte(ctx, [...setB].join(","), r);
  ctx.fillText([...setB].join(","), xB, y);

  if (setC.size > 0) {
    ajustarFonte(ctx, [...setC].join(","), r);
    ctx.fillText([...setC].join(","), xC, yC);
  }

  ajustarFonte(ctx, [...interAB].join(","), r / 2);
  ctx.fillText([...interAB].join(","), canvas.width / 2, y);

  if (setC.size > 0) {
    ajustarFonte(ctx, [...interAC].join(","), r / 2);
    ctx.fillText([...interAC].join(","), xA, yC);

    ajustarFonte(ctx, [...interBC].join(","), r / 2);
    ctx.fillText([...interBC].join(","), xB, yC);

    ajustarFonte(ctx, [...interABC].join(","), r / 2);
    ctx.fillText([...interABC].join(","), xC, y);
  }
}

function baixarImagem() {
  const canvas = document.getElementById("vennCanvas");
  const link = document.createElement("a");
  link.download = "diagrama_venn.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

window.onresize = gerarDiagrama;
