module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Tasks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        done: {
            type: Sequelize.BOOLEAN,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: queryInterface => queryInterface.dropTable('Tasks'),
};
