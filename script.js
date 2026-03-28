const apiKey = "goldapi-1n1ypo19mn96w2wu-io";

let goldRate = 0;

async function fetchGoldPrice() {
    try {
        const res = await fetch("https://api.metals.live/v1/spot/gold");
        const data = await res.json();

        // Example response: [{gold: 2300.5}]
        let pricePerOunce = data[0].gold;

        goldRate = (pricePerOunce / 31.1).toFixed(2);

        document.getElementById("goldPrice").innerText =
            "₹ " + goldRate + " per gram";

    } catch (err) {
        document.getElementById("goldPrice").innerText =
            "Error loading price 😢";
        console.log(err);
    }
}
        // Calculator
        window.calculate = function () {
            let grams = document.getElementById("grams").value;
            let total = grams * goldRate;

            document.getElementById("result").innerText =
                "Total Price: ₹ " + total;
        };

        // Suggestion logic
        if (goldRate < 6000) {
            document.getElementById("suggestion").innerText =
                "🟢 Good time to BUY";
        } else {
            document.getElementById("suggestion").innerText =
                "🔴 Price is high, wait";
        }

    })
    .catch(error => {
        document.getElementById("goldPrice").innerText =
            "Error loading price 😢";
    });

window.toggleTab = function (element) {
    alert("Clicked!");

    let tab = element.parentElement;

    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("active");
    });

    tab.classList.add("active");
}

const ctx = document.getElementById('chart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Gold Price (₹/gram)',
            data: [5900, 6100, 6050, 6200, 6150],
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

let goldRate = 6200;

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("goldPrice")) {
        document.getElementById("goldPrice").innerText =
            "₹ " + goldRate + " per gram";
    }

});

function calculate() {
    let grams = document.getElementById("grams").value;
    let total = grams * goldRate;

    document.getElementById("result").innerText =
        "₹ " + total;
}

function contact() {
    window.open("https://wa.me/91XXXXXXXXXX", "_blank");
}
