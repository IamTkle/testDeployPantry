// class Entry {
//   iid: string;
//   quantity: string;
//   category: string;
//   name: string;
//   price: string;
//   icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//   expiryGroups: ExpiryGroup[];

//   constructor(
//     iid: string,
//     quantity: string,
//     category: string,
//     name: string,
//     price: number,
//   ) {
//     this.iid = iid;
//     this.quantity = quantity;
//     this.category = category;
//     this.name = name;
//     this.price = price;
//     this.icon = Entry.getIcon(category);
//     this.expiryGroups = [];

//     for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
//       this.expiryGroups[i] = {
//         expDate: new Date(
//           2022,
//           Math.floor(Math.random() * 11),
//           Math.floor(Math.random() * 11)
//         ),
//         count: 3,
//       };
//     }
//   }

//   getObj(): Item {
//     return {
//       itemID: this.iid,
//       quantity: this.quantity,
//       category: this.category,
//       name: this.name,
//       price: this.price,
//       icon: this.icon,
//       expiryGroups: this.expiryGroups,
//     };
//   }

//   static getIcon(category: string) {
//     const icon = mapIcon[category];

//     if (icon) return icon;
//     return <MeatIcon />;
//   }
// }
// export const entries: Item[] = [
//   new Entry(
//     "439693P",
//     "2L",
//     "Dairy",
//     "Coles Full Cream Milk",
//     "$2.39"
//   ).getObj(),
//   new Entry(
//     "8150288P",
//     "3L",
//     "Dairy",
//     "Coles Full Cream Milk",
//     "$3.59"
//   ).getObj(),
//   new Entry(
//     "7667244P",
//     "1L",
//     "Dairy",
//     "Coles Skim Long Life Milk",
//     "1.25"
//   ).getObj(),
//   new Entry(
//     "93760P",
//     "500g",
//     "Dairy",
//     "Western Star Chef''s Choice Unsaltted Cultured Butter",
//     "$6.50"
//   ).getObj(),
//   new Entry(
//     "3780664P",
//     "250g",
//     "Dairy",
//     "The Organic Milk Company Unsalted Butter",
//     "$5.00"
//   ).getObj(),
//   new Entry(
//     "116322P",
//     "150g",
//     "Pantry",
//     "Nescafe Blend 43 Instant Coffee",
//     "$9.40"
//   ).getObj(),
//   new Entry("120137P", "500g", "Pantry", "CSR Brown Sugar", "$2.15").getObj(),
//   new Entry("254916P", "1kg", "Pantry", "CSR Caster Sugar", "$2").getObj(),
//   new Entry(
//     "6955662P",
//     "567g",
//     "Bakery",
//     "Mission Original Wraps 8 pack",
//     "$4.00"
//   ).getObj(),
//   new Entry(
//     "5881265P",
//     "2kg",
//     "Pantry",
//     " Coles White Self Raising Flour",
//     "$1.80"
//   ).getObj(),
//   new Entry(
//     "5880841P",
//     "2kg",
//     "Pantry",
//     " Coles White Plain Flour",
//     "$1.80"
//   ).getObj(),
//   new Entry(
//     "8532284P",
//     "50mL",
//     "Pantry",
//     "Queen Natural Vanilla Concentrated Extract",
//     "$7.40"
//   ).getObj(),
//   new Entry(
//     "1034234P",
//     "800g",
//     "Dairy, Eggs & Meals",
//     "Coles Free Range Jumbo Eggs 12 pack",
//     "$5.00"
//   ).getObj(),
//   new Entry(
//     "9393015P",
//     "1.2kg",
//     "Pantry",
//     "Sanitarium Weet-Bix Breakfast Cereal",
//     "$5.00"
//   ).getObj(),
//   new Entry(
//     "254971P",
//     "1kg",
//     "Pantry",
//     "Uncle Tobys Traditional Porridge Oats",
//     "$6.00"
//   ).getObj(),
//   new Entry(
//     "5322140P",
//     "700g",
//     "Bakery",
//     "Wonder White Bread Wholemeal Plus Iron",
//     "$3.40"
//   ).getObj(),
//   new Entry(
//     "7716441P",
//     "500mL",
//     "Pantry",
//     "MasterFoods Barbecue Sauce",
//     "$2.95"
//   ).getObj(),
//   new Entry(
//     "2263179P",
//     "1.1kg",
//     "Meat & Seafood",
//     "Coles RSPCA Approved Chicken Breast Fillets Large Pack",
//     "$10.45"
//   ).getObj(),
//   new Entry(
//     "7190913P",
//     "200g",
//     "Pantry",
//     "MasterFoods All Purpose Seasoning",
//     "$5.70"
//   ).getObj(),
//   new Entry(
//     "2999418P",
//     "3L",
//     "Drinks",
//     "Nudie Nothing But Juice Orange",
//     "$9.00"
//   ).getObj(),
//   new Entry(
//     "3329035P",
//     "500g",
//     "Pantry",
//     "Coles Durum Wheat Pasta Large Spirals",
//     "$1.00"
//   ).getObj(),
//   new Entry(
//     "8850814P",
//     "1kg",
//     "Meat & Seafood",
//     "Coles Beef 3 Star Regular Mince",
//     "$12.00"
//   ).getObj(),
//   new Entry(
//     "9007723P",
//     "1kg",
//     "Meat & Seafood",
//     "K-Roo Kangaroo Mince",
//     "$12.00"
//   ).getObj(),
// ];

export interface shoppingListAPIitem {
  itemId: string;
  count: number;
  price: number;
  name: string;
  quantity: string;
  category: string;
};

export type ShoppingListEntry = {
  rid: string;
  name: string;
  category: string;
  intake: string;
  price: number;
  quantity: number;
  img: string;
};

export const shopProducts: shoppingListAPIitem[] = [
  {
    itemId: "123456Q",
    count: 1, 
    price: 12.50,
    name: "Creme caramel",
    quantity: "500g",
    category: "Bakery",
  },
  // {
  //   rid: "123456W",
  //   name: "Milk",
  //   category: "Dairy",
  //   intake: "10g",
  //   price: 5.00,
  //   quantity: 1,
  //   img: "https://shop.coles.com.au/wcsstore/Coles-CAS/images/8/0/8/8083963.jpg",
  // },
  // {
  //   rid: "123456E",
  //   name: "Chicken 65",
  //   category: "Dairy",
  //   intake: "1Kg",
  //   price: 20,
  //   quantity: 3,
  //   img: "https://webknox.com/recipeImages/1506697-556x370.jpg",
  // },
  
];

export const DOMAIN = "https://pantties.azurewebsites.net";
