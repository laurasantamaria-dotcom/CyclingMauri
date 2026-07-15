const curses = [12, 18, 9, 15, 7, 11, 5, 8, 6, 10];
const noms = [
    "C1","C2","C3","C4","C5",
    "C6","C7","C8","C9","C10"
];

// Evolució
new Chart(document.getElementById("evolucio"), {
    type: "line",
    data: {
        labels: noms,
        datasets: [{
            label: "Posició",
            data: curses,
            borderColor: "#1f4e79",
            backgroundColor: "rgba(31,78,121,0.15)",
            borderWidth: 3,
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
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

// Nivells
new Chart(document.getElementById("nivells"), {
    type: "doughnut",
    data: {
        labels: [
            "Catalana",
            "Copa d'Espanya",
            "Nacional",
            "Altres"
        ],
        datasets: [{
            data: [6, 6, 3, 1],
            backgroundColor: [
                "#2563eb",
                "#f97316",
                "#22c55e",
                "#9ca3af"
            ]
        }]
    },
    options: {
        responsive: true
    }
});