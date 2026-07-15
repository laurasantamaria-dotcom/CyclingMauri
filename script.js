fetch("dades.json")
  .then(response => response.json())
 .then(dades => {

    console.log(dades);

    // ---------- KPI ----------

    document.getElementById("curses").textContent = dades.length;

    const millor = Math.min(...dades.map(c => c.posicio));
    document.getElementById("millor").textContent = millor;

    const top10 = dades.filter(c => c.posicio <= 10).length;
    document.getElementById("top10").textContent = top10;

    const mitjana = (
      dades.reduce((suma, c) => suma + c.posicio, 0) / dades.length
    ).toFixed(1);

    document.getElementById("mitjana").textContent = mitjana;

    // ---------- Dades dels gràfics ----------

    const curses = dades.map(c => c.cursa);
    const posicions = dades.map(c => c.posicio);

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

  });