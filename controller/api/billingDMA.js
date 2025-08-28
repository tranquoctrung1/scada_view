const fetch = require('node-fetch');

module.exports.GetBillingDMA = async function (req, res) {
    try {
        const url = `https://mdcapi.ctn-cantho.com.vn/api`;

        const responseToken = await fetch(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'mdc',
                password: 'tw32vy8GBQAdouxs1',
            }),
        });

        const tokenData = await responseToken.json();

        if (tokenData && tokenData.access_token) {
            const response = await fetch(`${url}/v1/crm/data`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            res.json(data);
        } else {
            res.status(401).json({ error: 'Login failed, no token' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
