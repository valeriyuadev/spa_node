module.exports = ( sequelize, Sequelize ) => {
    const Tutorial = sequelize.define( "tutorial", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        cathegory: {
            type: Sequelize.INTEGER
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Tutorial;
};