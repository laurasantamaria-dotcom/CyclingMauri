fetch("dades.json")
  .then(response => response.json())
 .then(dades => {

const dadesValides = dades.filter(c => !isNaN(Number(c.posicio)));

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