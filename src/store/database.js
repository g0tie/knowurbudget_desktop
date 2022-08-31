import * as alasql from 'alasql';

function getCurrentUser()
{
    return window.localStorage.getItem('currentUser');
}

function setCurrentUser(value)
{
    window.localStorage.getItem('currentUser', value);
}

const createDatabase = () =>
{
    alasql(`
    CREATE LOCALSTORAGE DATABASE IF NOT EXISTS db;
    ATTACH LOCALSTORAGE DATABASE db;
    USE db;
    `);
}

const  createTables = async () =>
{
    try {

        await alasql(`CREATE TABLE IF NOT EXISTS Users(id INT PRIMARY KEY, username STRING);`)
        
        await alasql(`CREATE TABLE IF NOT EXISTS Types(id INT AUTOINCREMENT PRIMARY KEY, name STRING, user_id INT REFERENCES Users(id));`);
        
        await alasql(`CREATE TABLE IF NOT EXISTS Expenses(id INT AUTOINCREMENT PRIMARY KEY, name STRING, amount INT, date DATETIME, typeid INT REFERENCES Types(id), user_id INT REFERENCES Users(id));`)
        
        await alasql(`CREATE TABLE IF NOT EXISTS Limit(id INT AUTOINCREMENT PRIMARY KEY, amount INT, date DATETIME, user_id INT REFERENCES Users(id) );`)
        
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
}

const persistData = async (data) => {
    try {

        await alasql(`INSERT INTO Users VALUES ? WHERE id = ;`, [data.username, data.id]);
        
        await data.expenses.map(expense => {
            alasql(`INSERT INTO Expenses VALUES ? WHERE id = ;`, [expense, data.id]);
        });

        await alasql(`INSERT INTO Limit VALUES ? WHERE id = ;`, [data.limit, data.id]);

    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
}

const insertData = async (table,payload) =>
{
    try {
        switch (table) {
            case "expenses":
                alasql(`INSERT INTO Expenses VALUES ?`, [payload]);
            break;

            case "types":
                alasql(`INSERT INTO Types VALUES ?`, [payload]);
            break;

            case "limit":
                alasql(`INSERT INTO Limit VALUES ?`, [payload]);
            break;
            
            case "users":
                alasql(`INSERT INTO Users VALUES ?`, [payload]);
            break;
        }
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
}

const getData = (id, table) =>
{
    switch (table) {
        case "expenses":
           return alasql(`SELECT * FROM Expenses WHERE id = ?`, [id]);

        case "types":
           return alasql(`SELECT * FROM Types WHERE id = ?`, [id])[0];

        case "limit":
           return alasql(`SELECT * FROM Limit WHERE id = ?`, [id])[0];
           
        case "users":
            return alasql(`SELECT * FROM Users WHERE id = ?`, [id])[0];
    }

}

const getExpensesByType = (typeId, userId) => {
    if (isNaN(typeId)) return getDatas("expenses", userId);

    return alasql(`SELECT * FROM Expenses WHERE typeid = ? AND user_id = ?`, [typeId, userId])
    .map(expense => ({...expense, typeid:typeId})  );
}

const getDatas = (table, userId) => {
    switch (table) {
        case "expenses":
           return alasql(`SELECT * FROM Expenses WHERE user_id = ?`, [userId]);

        case "types":
           return alasql(`SELECT * FROM Types WHERE user_id = ?`, [userId]);

        case "limit":
           return alasql(`SELECT * FROM Limit WHERE user_id = ?`, [userId]);
    }
}

const getByDate = (table, start, end) => {
    return (alasql(`SELECT * from Expenses WHERE date BETWEEN ? AND ?`, [start, end]));
}

const updateData = (id, table, payload) =>
{
    switch (table) {
        case "expenses":
            alasql(`UPDATE FROM Expenses SET ? WHERE user_id = ?`, [payload, id]);
        break;

        case "types":
            alasql(`UPDATE FROM Types SET ? WHERE user_id = ?`, [payload, id]);
        break;

        case "limit":
            alasql(`UPDATE Limit SET amount = ? WHERE user_id = ?`, [payload, id]);
        break;
    }

}

const deleteData = (id, table, userId) =>
{
    switch (table) {
        case "expenses":
            alasql(`DELETE FROM Expenses WHERE id = ? AND ? `, [id, userId]);
        break;

        case "types":
            alasql(`DELETE FROM Types WHERE id = ?AND ? `, [id, userId]);
        break;

        case "limit":
            alasql(`DELETE FROM Limit WHERE id = ? AND ? `, [id, userId]);
        break;
    }

}

export {
    createDatabase,
    createTables,
    insertData,
    getData,
    getDatas,
    updateData,
    deleteData,
    getExpensesByType,
    getByDate,
    persistData,
    getCurrentUser,
    setCurrentUser
}