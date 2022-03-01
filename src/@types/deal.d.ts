export interface IDeal {
    id: string; 
    name: string; 
    amount: number; 
    stage: number; 
    created_at: string;
 }
 
 export type DealContextType = {
   filteredDeals: IDeal[];
   isLoaded: boolean;
   filterDeals: (name: any, from: any, to: any) => void;
   fetchDeals: () => void;
   resetFilter: () => void;
 }