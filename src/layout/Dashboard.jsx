import * as Layout from '../layout';
import AddExpenseBtn from '../components/AddExpenseBtn';
import React from 'react';

const Dashboard  = () => {
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
