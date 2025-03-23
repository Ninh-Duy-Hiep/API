const User = require('./User');
const Label = require('./Label');
const FavoriteLabel = require('./Favorite_Label');
const FavoriteDisease = require('./Favorite_Disease');
const FavoriteMedicine = require('./Favorite_Medicine');

// Thiết lập các mối quan hệ
const setupAssociations = () => {
  // Label associations
  Label.hasMany(FavoriteLabel, { foreignKey: "label_id" });
  Label.belongsTo(User, { foreignKey: "user_id" });

  // FavoriteLabel associations
  FavoriteLabel.belongsTo(User, { foreignKey: "user_id" });
  FavoriteLabel.belongsTo(Label, { foreignKey: "label_id" });
  FavoriteLabel.belongsTo(FavoriteDisease, { foreignKey: "favorite_disease_id" });
  FavoriteLabel.belongsTo(FavoriteMedicine, { foreignKey: "favorite_medicine_id" });
};

module.exports = setupAssociations;