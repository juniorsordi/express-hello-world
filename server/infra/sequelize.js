const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
});

async function connect() {
    try {
        let resp = await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        ///
        const User = sequelize.define('User', {
            // Model attributes are defined here
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING
                // allowNull defaults to true
            },
            email: {
                type: DataTypes.STRING
                // allowNull defaults to true
            }
        }, {
            freezeTableName: true
        });

        // `sequelize.define` also returns the model
        console.log(User === sequelize.models.User); // true
        User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: DataTypes.TEXT
                // allowNull defaults to true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            foto: {
                type: DataTypes.TEXT
                // allowNull defaults to true
            },
            id_tipo_login: {
                type: DataTypes.INTEGER
                // allowNull defaults to true
            },
            is_admin: {
                type: DataTypes.INTEGER
                // allowNull defaults to true
            },
            ativo: {
                type: DataTypes.INTEGER
                // allowNull defaults to true
            },
            id_empresa: {
                type: DataTypes.INTEGER
                // allowNull defaults to true
            },
            
        }, { sequelize, tableName: 'usuario3', });
        const user = new User({ id: 1 });
        await User.sync({ force: true });
        console.log("The table for the User model was just (re)created!");
        ///
        return resp;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;