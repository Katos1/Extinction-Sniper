import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { Item } from './types';

const sniperConfig = loadConfig();

function loadConfig() {
  const configPath = path.resolve(process.cwd(), 'dist', 'src', 'config.json');
  const configContents = fs.readFileSync(configPath, 'utf-8');
  const sniperConfig = JSON.parse(configContents);

  return sniperConfig;
}

function postToDiscord(itemArray: Array<Item>): void {
  const currentDate = new Date();

  const webhookParams = {
    username: sniperConfig.username,
    avatar_url: sniperConfig.avatar_url,
    embeds: [
      {
        title: '**Found new Item(s)**',
        color: 13243443,
        fields: [],
        footer: { text: currentDate.toTimeString() },
      },
    ],
  };

  const staticHeaders = {
    'Content-type': 'application/json',
  };

  itemArray.forEach((item: Item) => {
    webhookParams.embeds[0].fields.push({
      name: `\`\`\` ${item.itemId} \`\`\``,
      value: `Price: $${item.price}\nSeller: ${item.seller}`,
    });
  });

  fetch(sniperConfig.webhook_url, {
    method: 'POST',
    headers: staticHeaders,
    body: JSON.stringify(webhookParams),
  }).catch(() => console.error('[ERROR] Failed to send webhook'));
}

export { loadConfig, postToDiscord };
