const axios = require('axios');

const compileCode = async (req, res) => {
    try {
        const { code, language, input } = req.body;
        const clientId = '8bdb62745746f7fdcef1b24e7ee1d468';
        const clientSecret = 'e7beba5c6cf30b5dc76098acb5570f0a838220ed89a6cdeaf347266909e4796a';
        const apiURL = 'https://api.jdoodle.com/v1/execute';

        const response = await axios.post(apiURL, {
            clientId: clientId,
            clientSecret: clientSecret,
            script: code,
            language: language,
            versionIndex: '0',
            stdin: input
        });

        if (response.status === 200) {
            const responseData = response.data;
            if ('output' in responseData) {
                res.status(200).json({ output: responseData.output });
            } else if ('error' in responseData) {
                res.status(400).json({ error: responseData.error });
            } else {
                res.status(500).json({ error: 'Unknown error occurred' });
            }
        } else {
            res.status(500).json({ error: 'Failed to execute code' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    compileCode
};
