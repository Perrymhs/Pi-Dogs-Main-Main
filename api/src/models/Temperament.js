const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("temperament", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,//Si no pasa ID, genera uno nuevo automaticamente
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};