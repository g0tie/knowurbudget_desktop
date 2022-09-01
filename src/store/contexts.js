import React from "react";
import {getDatas, getData, getCurrentUser} from "./database";
import { calculateTotalExpenses } from "../helpers/common";
import {
  updateData, 
  getExpensesByType, 
  insertData,
  deleteData,
  persistData
} from "../store/database";
import { syncData } from "../api";

const MainContext = React.createContext();

function MainReducer(state, action) {
    switch (action.type) {
      case 'setLimit': {
        updateData(getCurrentUser(),'limit', action.payload);
        return {...state, limit: {value: action.payload}};
      }

      case 'removeExpense': {
        deleteData(action.payload, 'expenses', getCurrentUser());
        return {
          ...state,
          expenses: state.expenses.filter(expense => expense.id !== action.payload),
          totalExpenses: calculateTotalExpenses(state.expenses)
        } 
      }

      case 'addExpense': {
        insertData('expenses', action.payload);
        return {...state,
          expenses: getDatas('expenses', getCurrentUser()),
          totalExpenses: calculateTotalExpenses(state.expenses)
        };
      }

      case 'sortExpensesByType': {
        let expenses = getExpensesByType(parseInt(action.payload), getCurrentUser());
        return {...state, 
          expenses
        }
      }

      case 'setError': {
        return {...state, 
          error: action.payload
        }
      }

      case 'setLoggedState': {
        return {...state, 
          logged: action.payload
        }
      }
      
      case 'switchUser': {
        const userDatas = syncData(action.payload);
        const totalExpenses = calculateTotalExpenses(userDatas.expenses);
        
        return {...userDatas,
          logged: true,
          totalExpenses,
          expenses: userDatas.expenses,
          user: {name: userDatas.username},
          limit: userDatas.limit
        }
      }

      case 'persistData': {
        persistData(state);
        return state;
      }

      case 'initContext': {
        if (action.payload) {
          const userDatas = syncData(getCurrentUser());
          const totalExpenses = calculateTotalExpenses(userDatas.expenses);
  
          return {...userDatas,
            logged: true,
            totalExpenses,
            expenses: userDatas.expenses,
            user: {name: userDatas.username},
            limit: { value: userDatas.limit }
          }
        }

        const expenses = getDatas("expenses", getCurrentUser());
        const totalExpenses = calculateTotalExpenses(expenses);
        return {
          ...state, 
          limit: { value: getData(0, "limit").amount },
          expenses,
          totalExpenses,
          logged: false,
          user : {name: getData(0, "users").username},
        }
      }

      case 'saveToServer': {
        //save to server api request
        return state;
      }

      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}

    
function MainProvider({children}) {
    let expenses = getDatas('expenses');
    let totalExpenses = calculateTotalExpenses(expenses);

    const [state, dispatch] = React.useReducer(MainReducer, {
        types: getDatas("types"),
        limit: 0,
        expenses,
        totalExpenses,
        user: {
          name:"Pablo"
        },
        error:false,
        logged: false,
        childrenAccounts: [],
        currentUser: null
    })

    const value = {state, dispatch}
    return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

function useMainContext() {
    const context = React.useContext(MainContext)
    if (context === undefined) {
        throw new Error('useMainContext must be used within a MainProvider')
    }
    return context
}
  
export{
    MainProvider,
    useMainContext,
    MainContext
};