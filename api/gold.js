export default async function handler(req, res) {
    const response = await fetch("https://www.goldapi.io/api/XAU/INR", {
        method: "GET",
        headers: {
            "x-access-token": process.env.GOLD_API_KEY,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    res.status(200).json(data);
}
