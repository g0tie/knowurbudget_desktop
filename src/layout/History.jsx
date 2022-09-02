import Expense from "../components/Expense";
import TypeDropdown from "../components/TypeDropdown";
import { useMainContext } from "../store/contexts";
import { getTypeName } from "../helpers/common";
import React from "react";

const History = () => {
    const { state } = useMainContext();

    return (
      <div className="p-4 lg:order-none xs:order-1">
        
        <TypeDropdown/>
        <div 
        style={{
          height:"70vh",
          width:"470px"
          }}
        className="sm:w-full scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-indigo-600 scrollbar-track-gray-100  overflow-y-auto">
          {
            state.expenses.map(expense => 
              <Expense key={expense.id} id={expense.id} remoteId={expense?.remoteId} title={expense.name} date={expense.date} type={getTypeName(expense.typeid)} amount={expense.amount}/>
            )
          }
        </div>
      </div>
    );
  }
  
export default History;
  