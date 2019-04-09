module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TEXT,
      alloqNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Post;
};
