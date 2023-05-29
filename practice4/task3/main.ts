import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

//****************************************************
// Код запускати командою ts-node main.ts list.json
//****************************************************


//Завдання 3
const jsonFilePath = process.argv[2];
const listPagesFolder = 'list_pages';

function createFolder(folderName: string): void {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
}

async function saveHtmlContent(url: string, content: string): Promise<void> {
    const fileName = `${path.basename(url, '.html')}.html`;
    const filePath = path.join(listPagesFolder, fileName);
    fs.writeFileSync(filePath, content);
    console.log(`Saved ${fileName}`);
}

async function processUrls(urls: string[]): Promise<void> {
    createFolder(listPagesFolder);

    for (const url of urls) {
        try {
            const response = await axios.get(url);
            await saveHtmlContent(url, response.data);
        } catch (error) {
            console.error(`Error fetching`);
        }
    }
}

function readAndParseJsonFile(filePath: string): void {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading JSON file: ${err.message}`);
            return;
        }

        try {
            const urls = JSON.parse(data) as string[];
            processUrls(urls);
        } catch (error) {
            console.error(`Error parsing JSON file`);
        }
    });
}
readAndParseJsonFile(jsonFilePath);
