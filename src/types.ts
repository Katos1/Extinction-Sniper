export interface ItemMetaData {
  id: number;
  ammoInClip: number;
  ammo: number;
}

export interface Item {
  id: number;
  itemData?: ItemMetaData;
  itemId: string;
  ownerId: number;
  price: number;
  seller: string;
}

export interface ConfigItem {
  itemName: string;
  buyPrice: number;
}
