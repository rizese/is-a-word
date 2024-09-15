import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

const importWords = async () => {
  try {
    await client.connect();

    const filePath = path.join(__dirname, '../path-to-your-file/words.txt');
    const fileStream = fs.createReadStream(filePath, 'utf-8');
    const words: Array<string> = [];

    fileStream.on('data', (chunk: string) => {
      words.push(...chunk.split('\n').map(word => word.trim()));
    });

    fileStream.on('end', async () => {
      const insertQuery = 'INSERT INTO words (word, first_letter) VALUES ($1, $2)';

      for (const word of words) {
        const firstLetter = word.charAt(0);
        await client.query(insertQuery, [word, firstLetter]);
      }

      await client.end();
      console.log('Words imported successfully.');
    });

  } catch (error) {
    console.error('Error importing words:', error);
    await client.end();
  }
};

importWords();
