module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Reservation;
};
