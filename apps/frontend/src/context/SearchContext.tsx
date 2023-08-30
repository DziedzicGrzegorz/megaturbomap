import React from 'react';

type SearchContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<SearchContextType>({
    search: "",
    setSearch: () => {},
});