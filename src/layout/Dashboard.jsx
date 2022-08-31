import * as Layout from '../layout';
import AddExpenseBtn from '../components/AddExpenseBtn';
import React, { useEffect } from 'react';
import { useMainContext } from '../store/contexts';
import { getCurrentUser } from '../store/database';

const Dashboard  = () => {
  const { state, dispatch } = useMainContext();


  useEffect(() => {
    //init context
    const isUserLogged = window.localStorage.getItem("logged");
    dispatch({type:"initContext", payload: isUserLogged});
  } , []);

  return (
    <div className="App p-8">
    <Layout.Header />

    <div className='xs:flex-col flex lg:flex-row justify-evenly md:items-center'>
        <Layout.History />
        <Layout.Graphics />
    </div>
        
        <AddExpenseBtn />
    </div>
  );
}

export default Dashboard;
