export default (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Reservation.associate = (models) => {
    // Each reservation belongs to one Post
    Reservation.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });

    // Each reservation belongs to one User
    Reservation.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Reservation;
};
