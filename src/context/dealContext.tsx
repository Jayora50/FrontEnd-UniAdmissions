// context/dealContext.tsx
import axios from 'axios';
import * as React from 'react';
import { DealContextType, IDeal } from '../@types/deal';

export const DealContext = React.createContext<DealContextType | null>(null);

const DealProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [deals, setDeals] = React.useState<IDeal[]>([]);
  const [filteredDeals, setFilteredDeals] = React.useState<IDeal[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false)
  
  const fetchDeals = async () => {
    const response = await axios.get(`http://localhost:8000/Deals`);
    const deals = response.data as IDeal [];
    setDeals(deals);
    setFilteredDeals(deals);
    setIsLoaded(true)
  }

  const filterDeals = (value: any, from: any, to: any) => {
    let filteredDeals: IDeal[] = JSON.parse(JSON.stringify(deals));
    if(value){
      filteredDeals = filteredDeals.filter((deal: IDeal) => deal.name === value);
    }
    if(from && to){         
      filteredDeals = filteredDeals.filter((deal: IDeal) => 
        new Date(deal.created_at) >= new Date(from) && 
        new Date(deal.created_at) <= new Date(to)
      );
    }
    setFilteredDeals(filteredDeals)
  }

  const resetFilter = () => {
    setFilteredDeals(deals)
  }

  return (
    <DealContext.Provider value={{ filteredDeals, fetchDeals, filterDeals, resetFilter, isLoaded }}>
      {children}
    </DealContext.Provider>
  );
};

export default DealProvider;