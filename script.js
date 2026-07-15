fetch("dades.json")
  .then(response => response.json())
  .then(dades => {

    const dadesValides = dades.filter(c =>
        typeof c.posicio === "number"
    );

    console.log(dades);

    // ---------- KPI ----------

    document.getElementById("curses").textContent = dades.length;

    const millor = Math.min(...dadesValides.map(c => Number(c.posicio)));
    document.getElementById("millor").textContent = millor;

    const top10 = dadesValides.filter(c => Number(c.posicio) <= 10).length;
    document.getElementById("top10").textContent = top10;

    const mitjana = (
  dadesValides.reduce((suma, c) => suma + Number(c.posicio), 0) /
  dadesValides.length
).toFixed(1);

    document.getElementById("mitjana").textContent = mitjana;

    // ---------- Dades dels gràfics ----------

    const curses = dadesValides.map(c => c.cursa);
const posicions = dadesValides.map(c => Number(c.posicio));

    // Comptar nivells
    const nivells = {};

    dades.forEach(c => {
      nivells[c.nivell] = (nivells[c.nivell] || 0) + 1;
    });

    // ---------- Gràfic evolució ----------

    new Chart(document.getElementById("evolucio"), {

      type: "line",

      data: {

        labels: curses,

        datasets: [{
          label: "Posició",
          data: posicions,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,.15)",
          fill: true,
          tension: .3
        }]
      },

      options: {

        plugins:{
          legend:{
            display:false
          }
        },

        scales:{
          y:{
            reverse:true,
            beginAtZero:false
          }
        }
      }

    });

    // ---------- Gràfic nivells ----------

    new Chart(document.getElementById("nivells"),{

      type:"doughnut",

      data:{

        labels:Object.keys(nivells),

        datasets:[{

          data:Object.values(nivells),

          backgroundColor:[
            "#2563eb",
            "#22c55e",
            "#f97316",
            "#9ca3af"
          ]

        }]

      }

    });

    // ---------- Gràfic Copa Catalana ----------

const cursesCatalana = dadesValides.filter(c => c.nivell === "catalana");

console.log("Copa Catalana:", cursesCatalana);
console.log(cursesCatalana.length);

new Chart(document.getElementById("copaCatalana"), {
    type: "line",
    data: {
        labels: cursesCatalana.map(c => c.cursa),
        datasets: [{
            label: "Posició",
            data: cursesCatalana.map(c => c.posicio),
            borderColor: "#16a34a",
            backgroundColor: "rgba(22,163,74,0.15)",
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                reverse: true,
                beginAtZero: false
            }
        }
    }
});

const cursesEspanya = dadesValides.filter(c => c.nivell === "copa Espanya");
console.log("Copa Espanya:", cursesEspanya);
console.log("Nombre de curses:", cursesEspanya.length);

new Chart(document.getElementById("copaEspanya"), {
    type: "line",
    data: {
        labels: cursesEspanya.map(c => c.cursa),
        datasets: [{
            data: cursesEspanya.map(c => c.posicio),
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.15)",
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                reverse: true,
                beginAtZero: false
            }
        }
    }
});

const cursesNacionals = dadesValides.filter(c => c.nivell === "nacional");

new Chart(document.getElementById("nacionals"), {
    type: "line",
    data: {
        labels: cursesNacionals.map(c => c.cursa),
        datasets: [{
            data: cursesNacionals.map(c => c.posicio),
            borderColor: "#dc2626",
            backgroundColor: "rgba(220,38,38,0.15)",
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                reverse: true,
                beginAtZero: false
            }
        }
    }
});

// ---------- Taula de curses ----------

const tbody = document.querySelector("#taula-curses tbody");

dades.forEach(cursa => {

  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${cursa.data}</td>
    <td>${cursa.cursa}</td>
    <td>${cursa.posicio}</td>
    <td>${cursa.nivell}</td>
  `;

  tbody.appendChild(fila);

});
  });