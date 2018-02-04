export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {
      name: DataTypes.STRING,
      public: DataTypes.BOOLEAN,
    });
  
    Channel.associate = (models) => {
      // 1:M
      Channel.belongsTo(models.Team, {
        foreignKey: {
          name: 'teamId',
          field: 'team_id',
        },
      });
      // N:M
      Channel.belongsToMany(models.User, {
        through: 'channel_member',
        foreignKey: {
          name: 'channelId',
          field: 'channel_id',
        },
      });
    };

    sequelize.transaction({
        deferrable: sequelize.Deferrable.SET_DEFERRED
    });
  
    return Channel;
  };