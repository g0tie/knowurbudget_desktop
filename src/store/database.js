import * as alasql from 'alasql';

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

        alasql(`CREATE TABLE IF NOT EXISTS Types(id INT AUTOINCREMENT PRIMARY KEY, name STRING);`);
        alasql(`CREATE TABLE IF NOT EXISTS Expenses(id INT AUTOINCREMENT PRIMARY KEY, name STRING, amount INT, date DATETIME, typeid INT REFERENCES Types(id));`)
        alasql(`CREATE TABLE IF NOT EXISTS Limit(id INT AUTOINCREMENT PRIMARY KEY, amount INT, date DATETIME);`)
        
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
}

const persistData = async (data) => {
    try {

        await alasql(`DELETE FROM Expenses`);
        await alasql(`DELETE FROM Limit`);
        
        data.expenses.map(expense => {
            insertData('expenses', expense)
        });

        insertData("limit", data.limit);

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
    }

}

const getExpensesByType = (typeId) => {
    if (isNaN(typeId)) return getDatas("expenses");

    return alasql(`SELECT * FROM Expenses WHERE typeid = ?`, [typeId])
    .map(expense => ({...expense, typeid:typeId})  );
}

const getDatas = (table) => {
    switch (table) {
        case "expenses":
           return alasql(`SELECT * FROM Expenses`);

        case "types":
           return alasql(`SELECT * FROM Types`);

        case "limit":
           return alasql(`SELECT * FROM Limit`);
    }
}

const getByDate = (table, start, end) => {
    return (alasql(`SELECT * from Expenses WHERE date BETWEEN ? AND ?`, [start, end]));
}

const updateData = (id, table, payload) =>
{
    switch (table) {
        case "expenses":
            alasql(`UPDATE FROM Expenses SET ? WHERE id = ?`, [payload, id]);
        break;

        case "types":
            alasql(`UPDATE FROM Types SET ? WHERE id = ?`, [payload, id]);
        break;

        case "limit":
            alasql(`UPDATE Limit SET amount = ? WHERE id = ?`, [payload, id]);
        break;
    }

}

const deleteData = (id, table) =>
{
    switch (table) {
        case "expenses":
            alasql(`DELETE FROM Expenses WHERE id = ?`, [id]);
        break;

        case "types":
            alasql(`DELETE FROM Types WHERE id = ?`, [id]);
        break;

        case "limit":
            alasql(`DELETE FROM Limit WHERE id = ?`, [id]);
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
    persistData
}