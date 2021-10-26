export interface APIItem {
  itemID: string;
  quantity: string;
  name: string;
  price: number;
  expiry_Count: ExpiryGroup[];
  photo?: string;
}

export interface Item extends APIItem {
  category: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
export type ExpiryGroup = { expDate: Date; count: number };
