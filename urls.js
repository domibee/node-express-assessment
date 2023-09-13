const fs = require('fs');
const http = require('http');
const https = require('https');

async function downloadURL(URLToDownload) {
    const httpOrHttps = URLToDownload.startsWith('https') ? https : http;

    return new Promise((resolve, reject) => {
        httpOrHttps.get(URLToDownload, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const parsedUrl = new URL(URLToDownload);
                const hostname = parsedUrl.hostname;
                const fileName = `${hostname}.txt`;

                fs.writeFile(fileName, data, 'utf8', (err) => {
                    if (err) {
                        reject(`Error writing to ${fileName}:${err}`);
                    } else {
                        resolve({ status: `Wrote to ${hostname}`, writeStatus: true, hostname: hostname });
                    }
                });
            });
        }).on('error', (err) => {
            resolve({ status: `Couldn't download ${URLToDownload}:${err}`, writeStatus: false });
        });
    }).catch((error) => {
        console.error(error);
    });
}


async function processFile(fileName) {
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        const urls = data.split('\n');

        for (const url of urls) {
            if (url.trim() !== '') {
                try {
                    const result = await downloadURL(url.trim());
                    console.log(result.status);

                } catch (error) {
                    console.error(error);
                }
            }
        }
    } catch (error) {
        console.error(`Error reading ${fileName}: ${error}`);
        process.exit(1);
    }
}


async function main() {
    const fileName = process.argv[2];

    if (!fileName) {
        console.error('Please provide a file name as an argument.');
        process.exit(1);
    }

    try {
        await processFile(fileName);
    } catch (error) {
        console.error(error);
    }
}

main();
