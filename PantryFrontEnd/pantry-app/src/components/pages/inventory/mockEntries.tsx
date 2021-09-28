import { GiMeat as MeatIcon } from "react-icons/gi";

/* 
name
quantity
price
itemID
category
expiryGroup: [(expDate, count)*]

*/
export type Item = {
  iid: string;
  quantity: string;
  category: string;
  name: string;
  price: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

type IconMap = {
  [category: string]: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
};

const mapIcon: IconMap = {
  //     Coles Local Range 9 Products
  "Coles Local Range": <MeatIcon />,
  "Kids & Lunch Box": <MeatIcon />,
  "Entertaining at Home": <MeatIcon />,
  "Fruit & Vegetables": <MeatIcon />,
  "Meat & Seafood": <MeatIcon />,
  "From The Deli": <MeatIcon />,
  "Diary, Eggs & Meals": <MeatIcon />,
  "Convenience Meals": <MeatIcon />,
  Pantry: <MeatIcon />,
  Frozen: <MeatIcon />,
  Drinks: <MeatIcon />,
  "International Foods": <MeatIcon />,
  Household: <MeatIcon />,
  "Health & Beauty": <MeatIcon />,
  Baby: <MeatIcon />,
  Pet: <MeatIcon />,
  Liquor: <MeatIcon />,
  Tobacco: <MeatIcon />,
  //     Kids & Lunch Box 1,490 Products
  //     Entertaining at Home 1,151 Products
  //     Bakery 659 Products
  //     Fruit & Vegetables 546 Products
  //     Meat & Seafood 663 Products
  //     From The Deli 511 Products
  //     Dairy, Eggs & Meals 1,755 Products
  //     Convenience Meals 339 Products
  //     Pantry 6,494 Products
  //     Frozen 1,160 Products
  //     Drinks 1,548 Products
  //     International Foods 1,430 Products
  //     Household 2,766 Products
  //     Health & Beauty 4,160 Products
  //     Baby 630 Products
  //     Pet 806 Products
  //     Liquor 24 Products
  //     Tobacco 424
};
class Entry {
  iid: string;
  quantity: string;
  category: string;
  name: string;
  price: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;

  constructor(
    iid: string,
    quantity: string,
    category: string,
    name: string,
    price: string
  ) {
    this.iid = iid;
    this.quantity = quantity;
    this.category = category;
    this.name = name;
    this.price = price;
    this.icon = Entry.getIcon(category);
  }

  getObj(): Item {
    return {
      iid: this.iid,
      quantity: this.quantity,
      category: this.category,
      name: this.name,
      price: this.price,
      icon: this.icon,
    };
  }

  static getIcon(category: string) {
    const icon = mapIcon[category];

    if (icon) return icon;
    return <MeatIcon />;
  }
}
export const entries: Item[] = [
  new Entry(
    "439693P",
    "2L",
    "Dairy",
    "Coles Full Cream Milk",
    "$2.39"
  ).getObj(),
  new Entry(
    "8150288P",
    "3L",
    "Dairy",
    "Coles Full Cream Milk",
    "$3.59"
  ).getObj(),
  new Entry(
    "7667244P",
    "1L",
    "Dairy",
    "Coles Skim Long Life Milk",
    "1.25"
  ).getObj(),
  new Entry(
    "93760P",
    "500g",
    "Dairy",
    "Western Star Chef''s Choice Unsaltted Cultured Butter",
    "$6.50"
  ).getObj(),
  new Entry(
    "3780664P",
    "250g",
    "Dairy",
    "The Organic Milk Company Unsalted Butter",
    "$5.00"
  ).getObj(),
  new Entry(
    "116322P",
    "150g",
    "Pantry",
    "Nescafe Blend 43 Instant Coffee",
    "$9.40"
  ).getObj(),
  new Entry("120137P", "500g", "Pantry", "CSR Brown Sugar", "$2.15").getObj(),
  new Entry("254916P", "1kg", "Pantry", "CSR Caster Sugar", "$2").getObj(),
  new Entry(
    "6955662P",
    "567g",
    "Bakery",
    "Mission Original Wraps 8 pack",
    "$4.00"
  ).getObj(),
  new Entry(
    "5881265P",
    "2kg",
    "Pantry",
    " Coles White Self Raising Flour",
    "$1.80"
  ).getObj(),
  new Entry(
    "5880841P",
    "2kg",
    "Pantry",
    " Coles White Plain Flour",
    "$1.80"
  ).getObj(),
  new Entry(
    "8532284P",
    "50mL",
    "Pantry",
    "Queen Natural Vanilla Concentrated Extract",
    "$7.40"
  ).getObj(),
  new Entry(
    "1034234P",
    "800g",
    "Dairy, Eggs & Meals",
    "Coles Free Range Jumbo Eggs 12 pack",
    "$5.00"
  ).getObj(),
  new Entry(
    "9393015P",
    "1.2kg",
    "Pantry",
    "Sanitarium Weet-Bix Breakfast Cereal",
    "$5.00"
  ).getObj(),
  new Entry(
    "254971P",
    "1kg",
    "Pantry",
    "Uncle Tobys Traditional Porridge Oats",
    "$6.00"
  ).getObj(),
  new Entry(
    "5322140P",
    "700g",
    "Bakery",
    "Wonder White Bread Wholemeal Plus Iron",
    "$3.40"
  ).getObj(),
  new Entry(
    "7716441P",
    "500mL",
    "Pantry",
    "MasterFoods Barbecue Sauce",
    "$2.95"
  ).getObj(),
  new Entry(
    "2263179P",
    "1.1kg",
    "Meat & Seafood",
    "Coles RSPCA Approved Chicken Breast Fillets Large Pack",
    "$10.45"
  ).getObj(),
  new Entry(
    "7190913P",
    "200g",
    "Pantry",
    "MasterFoods All Purpose Seasoning",
    "$5.70"
  ).getObj(),
  new Entry(
    "2999418P",
    "3L",
    "Drinks",
    "Nudie Nothing But Juice Orange",
    "$9.00"
  ).getObj(),
  new Entry(
    "3329035P",
    "500g",
    "Pantry",
    "Coles Durum Wheat Pasta Large Spirals",
    "$1.00"
  ).getObj(),
  new Entry(
    "8850814P",
    "1kg",
    "Meat & Seafood",
    "Coles Beef 3 Star Regular Mince",
    "$12.00"
  ).getObj(),
  new Entry(
    "9007723P",
    "1kg",
    "Meat & Seafood",
    "K-Roo Kangaroo Mince",
    "$12.00"
  ).getObj(),
];
