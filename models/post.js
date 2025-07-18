export default (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    // Each Post belongs to one User
    Post.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE",
    });

    // A Post can have many Reservations; delete Reservations if Post is deleted
    Post.hasMany(models.Reservation, {
      foreignKey: "postId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return Post;
};
