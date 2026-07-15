fetch("dades.json")
  .then(response => response.json())
  .then(dades => {

    // KPI
    document.getElementById("curses").textContent = dades.length;

    const millor = Math.min(...dades.map(c => c.posicio));
    document.getElementById("millor").textContent = millor;

    const top10 = dades.filter(c => c.posicio <= 10).length;
    document.getElementById("top10").textContent = top10;

    const mitjana = (
      dades.reduce((suma, c) => suma + c.posicio, 0) / dades.length
    ).toFixed(1);

    document.getElementById("mitjana").textContent = mitjana;

  });