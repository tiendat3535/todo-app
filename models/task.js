module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        done: DataTypes.BOOLEAN,
    }, {});
    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'userId',
            },
            onDelete: 'CASCADE',
        });
    };
    return Task;
};
