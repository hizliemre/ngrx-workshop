export interface SalesDataWidgetData {
  id: string;
  name: string;
  bestSellers: BestSeller[];
}

interface BestSeller {
  name: string;
  count: number;
  unitPrice: number;
  total: number;
}
