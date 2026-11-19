exports.getExchangeRates = async (req, res) => {
    try {
        const response = await fetch(
            'https://open.er-api.com/v6/latest/INR'
        );

        if (!response.ok) {
            throw new Error('External API request failed');
        }

        const data = await response.json();

        res.status(200).json({
            success: true,
            base: data.base_code,
            rates: {
                USD: data.rates.USD,
                EUR: data.rates.EUR,
                GBP: data.rates.GBP,
                AED: data.rates.AED
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};