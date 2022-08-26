import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {seedTypes, createLocalLimit} from "./store/seeders"
import * as DB from "./store/database"

//INIT LOCAL DB CREATE TABLES AND Fill it
DB.createDatabase();
DB.createTables();
seedTypes();
createLocalLimit();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
