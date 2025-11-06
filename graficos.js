document.addEventListener("DOMContentLoaded", () => {
  const viagens = JSON.parse(localStorage.getItem("viagens")) || [];

  const resumo = document.getElementById("resumo");
  const canvas = document.getElementById("graficoCustos");

  if (!canvas) {
    console.error("Canvas 'graficoCustos' não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");

  if (viagens.length === 0) {
    resumo.textContent = "Nenhuma viagem cadastrada ainda.";
    return;
  }

  const labels = viagens.map(v => `${v.origem} -> ${v.destino}`);
  const data = viagens.map(v => v.valor);
  const total = data.reduce((acc, val) => acc + val, 0);

  resumo.textContent = `Total de viagens: ${viagens.length} | Valor total: R$ ${total.toFixed(2)}`;

  // destrói gráfico antigo, se existir
  const graficoExistente = Chart.getChart("graficoCustos");
  if (graficoExistente) graficoExistente.destroy();

  // cria o gráfico
  window.graficoCustos = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Custo das viagens (R$)",
          data,
          backgroundColor: "#56CCF2",
          borderColor: "#11151c",
          borderWidth: 1.5,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: false },
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: "#11151c",
          titleColor: "#E0E0E0",
          bodyColor: "#fff",
          titleFont: { size: 16, weight: "bold" },
          bodyFont: { size: 14 },
          displayColors: false,
          padding: 10,
          cornerRadius: 6,
        },
        title: {
          display: true,
          text: "Custo por Rota",
          color: "#E0E0E0",
          font: { size: 22, weight: "bold" },
          padding: 20,
        },
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: {
            color: "#E0E0E0",
            font: { size: 14 },
            maxRotation: 45,
            minRotation: 45,
          },
          grid: { color: "rgba(202,171,102,0.1)" },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#E0E0E0",
            font: { size: 14 },
          },
          grid: { color: "rgba(202,171,102,0.1)" },
        },
      },
      layout: { padding: 20 },
    },
  });
});
