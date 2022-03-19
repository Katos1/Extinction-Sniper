export interface ItemData {
  ammo: number;
  ammoInClip: number;
  id: number;
}

export interface Item {
  id: number;
  itemData?: ItemData;
  itemId: string;
  ownerId: number;
  price: number;
  seller: string;
}

export interface ConfigItem {
  itemName: string;
  buyPrice: number;
}
