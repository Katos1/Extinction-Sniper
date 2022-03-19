import fetch, { Response } from 'node-fetch';
import { Item, ConfigItem } from './types';
import { loadConfig, postToDiscord } from './utils.js';

const sniperConfig = loadConfig();
let knownItems: Array<Item> = [];

if (!sniperConfig) {
  throw new Error('Failed to load config file');
}

function handleResponse(apiItems: Array<Item>, itemContext: ConfigItem): void {
  const cheapItems = apiItems.filter((item) => {
    return item.price <= itemContext.buyPrice && !knownItems.some((_item) => _item.id === item.id);
  });

  if (cheapItems.length === 0) {
    return;
  }

  knownItems = knownItems.concat(cheapItems);
  postToDiscord(cheapItems);
}

function trackItems(): void {
  const watchedItems: Array<ConfigItem> = sniperConfig.watched_items;

  watchedItems.forEach((itemContext) => {
    const apiUrl = `https://api.gtaliferp.fr:8443/v1/extinction/marketplace/sell/${itemContext.itemName}`;

    fetch(apiUrl)
      .then((resp: Response) => resp.json())
      .then((resp: Array<Item>) => handleResponse(resp, itemContext))
      .catch(() => console.error(`[WARNING] Failed to fetch ${itemContext.itemName}`));
  });
}

setInterval(trackItems, sniperConfig.interval_msec);
