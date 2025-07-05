const GOLD_API_KEY = import.meta.env.VITE_GOLD_API_KEY;

export const getGoldPrice = async () => {
    try {
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
            method: 'GET',
            headers: {
                "x-access-token": GOLD_API_KEY,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        return data.price;
    } catch (err) {
        console.error('Failed to fetch gold price:', err);
        return null;
    }
};
