import { createContext, useState, useContext } from "react"
import {  Initialcategories } from '../constants/Data.js';






  export const DataContext = createContext(null);


 export const DataProvider = ({children}) => {

    const [account, setAccount]= useState({username: '', email: '' });
    const [categories, setCategories] = useState(Initialcategories)

    const addCategory = (newCategoryType) =>{
        if(!categories.some(category => category.type === newCategoryType)){
            const newCategory = {id : categories.length + 1, type: newCategoryType};
            setCategories([...categories, newCategory]);
        }
    }


    return(
        <DataContext.Provider value={{
            account,
            setAccount,
            categories,
            addCategory
        }}>
            {children}
        </DataContext.Provider>
    ) 
}

export const useData = () => useContext(DataContext);
