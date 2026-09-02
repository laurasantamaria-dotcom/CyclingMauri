fetch("dades.json")
  .then(response => response.json())
  .then(dades => {

    const dadesValides = dades.filter(c =>
      typeof c.posicio === "number"
    );

    console.log(dades);

    // ---------- KPI ----------

    document.getElementById("curses").textContent = dades.length;

    const millor = Math.min(
      ...dadesValides.map(c => Number(c.posicio))
    );

    document.getElementById("millor").textContent = millor;

    const top10 = dadesValides.filter(
      c => Number(c.posicio) <= 10
    ).length;

    document.getElementById("top10").textContent = top10;

    const mitjana = (
      dadesValides.reduce(
        (suma, c) => suma + Number(c.posicio),
        0
      ) / dadesValides.length
    ).toFixed(1);

    document.getElementById("mitjana").textContent = mitjana;


    // ---------- Dades dels gràfics ----------

    const curses = dadesValides.map(c => c.cursa);

    const posicions = dadesValides.map(
      c => Number(c.posicio)
    );


    // ---------- Gràfic evolució temporada ----------

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


    // ---------- Gràfic nivells ----------

    const nivells = {};

    dades.forEach(c => {

      const nivell = c.nivell
        .trim()
        .toLowerCase();

      if (nivell !== "") {

        nivells[nivell] =
          (nivells[nivell] || 0) + 1;

      }

    });


    const nomsNivells = Object.keys(nivells);

    const valorsNivells = Object.values(nivells);


    // Cada nivell té el seu color

    const colorsNivells = {

      "copa espanya": "#2563eb",

      "catalana": "#22c55e",

      "nacional": "#dc2626",

      "uci": "#f97316",

      "pista": "#7c3aed",

      "altres": "#9ca3af",

      "social": "#ec4899"

    };


    new Chart(
      document.getElementById("nivells"),
      {

        type: "doughnut",

        data: {

          labels: nomsNivells,

          datasets: [{

            data: valorsNivells,

            backgroundColor:
              nomsNivells.map(
                nivell =>
                  colorsNivells[nivell] || "#9ca3af"
              ),

            borderColor: "#ffffff",

            borderWidth: 3

          }]

        }

      }

    );


    // ---------- Copa Catalana ----------

    const cursesCatalana =
      dadesValides.filter(
        c =>
          c.nivell.trim().toLowerCase() === "catalana"
      );


    new Chart(
      document.getElementById("copaCatalana"),
      {

        type: "line",

        data: {

          labels:
            cursesCatalana.map(c => c.cursa),

          datasets: [{

            label: "Posició",

            data:
              cursesCatalana.map(c => c.posicio),

            borderColor: "#16a34a",

            backgroundColor:
              "rgba(22,163,74,0.15)",

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

      }

    );


    // ---------- Copa Espanya ----------

    const cursesEspanya =
      dadesValides.filter(
        c =>
          c.nivell.trim().toLowerCase() === "copa espanya"
      );


    new Chart(
      document.getElementById("copaEspanya"),
      {

        type: "line",

        data: {

          labels:
            cursesEspanya.map(c => c.cursa),

          datasets: [{

            label: "Posició",

            data:
              cursesEspanya.map(c => c.posicio),

            borderColor: "#2563eb",

            backgroundColor:
              "rgba(37,99,235,0.15)",

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

      }

    );


    // ---------- Nacionals ----------

    const cursesNacionals =
      dadesValides.filter(
        c =>
          c.nivell.trim().toLowerCase() === "nacional"
      );


    new Chart(
      document.getElementById("nacionals"),
      {

        type: "line",

        data: {

          labels:
            cursesNacionals.map(c => c.cursa),

          datasets: [{

            label: "Posició",

            data:
              cursesNacionals.map(c => c.posicio),

            borderColor: "#dc2626",

            backgroundColor:
              "rgba(220,38,38,0.15)",

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

      }

    );


    // ---------- UCI ----------

    const cursesUCI =
      dadesValides.filter(
        c =>
          c.nivell.trim().toLowerCase() === "uci"
      );


    new Chart(
      document.getElementById("uci"),
      {

        type: "line",

        data: {

          labels:
            cursesUCI.map(c => c.cursa),

          datasets: [{

            label: "Posició",

            data:
              cursesUCI.map(c => c.posicio),

            borderColor: "#f97316",

            backgroundColor:
              "rgba(249,115,22,0.15)",

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

      }

    );


    // ---------- Taula de curses ----------

    const tbody =
      document.querySelector("#taula-curses tbody");

    tbody.innerHTML = "";


    dades.forEach(cursa => {

      const fila =
        document.createElement("tr");


      fila.innerHTML = `

        <td>${cursa.data}</td>

        <td>${cursa.cursa}</td>

        <td>${cursa.posicio}</td>

        <td>${cursa.nivell}</td>

      `;


      tbody.appendChild(fila);

    });

  })

  .catch(error => {

    console.error(
      "Error carregant dades.json:",
      error
    );

  });