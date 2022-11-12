const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore:{
      type:DataTypes.INTEGER,
      // allowNull:false
    },
    overview:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    steps:{
      type:DataTypes.TEXT,
      // allowNull:false
    },
    image:{
      type:DataTypes.STRING
    }
  });
};
