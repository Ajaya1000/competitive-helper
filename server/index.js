const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

const PORT = 3001;

app.use(bodyParser.json());

app.post('/start', (req, res) => {
    // Execute shell script
    const contentNumber = req.body.code
    console.log(req)
    if (contentNumber == null) {
        return res.status(500).json({ error: 'Competitive contest code not found' });
    }

    exec(`compe ${contentNumber}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing script:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (stderr) {
            console.error('Script stderr:', stderr);
        }
        console.log('Script stdout:', stdout);
        res.json({ result: 'Script executed successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Native application server listening on port ${PORT}`);
});
