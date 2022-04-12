const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type:DataTypes.UUID,/*  DataTypes.UUID, */// Crea una clave primaria que tiene letras y numeros aleatorios
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, ///Si no pasa ID, genera uno nuevo automaticamente
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, //permite que este vacio o no.
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
    },
    
  },
 
  );
};