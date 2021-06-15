const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testGrocery', 'root', 'Tejes#123', {
    host: 'localhost',
    dialect: 'mysql',
});

async function connect(){
    let connection = '';
    try{
        connection = await sequelize.authenticate();
        console.log('Connected to DB');
    }
    catch(err) {
        console.log('[DB CONNECT] Error connecting to DB');
        throw err;
    }

    return connection;
}


export const connection = connect();