export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  available: boolean;
};

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};
