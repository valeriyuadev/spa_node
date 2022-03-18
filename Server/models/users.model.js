module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define( "users", {
        name: {
            type: Sequelize.STRING
        },
        passw: {
            type: Sequelize.STRING
        }
    });

    return User;
};