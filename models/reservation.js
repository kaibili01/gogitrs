module.exports = sequelize => {
  const Reservation = sequelize.define("Reservation", {});

  return Reservation;
};
