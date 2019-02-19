'use strict';

const Hash = use('Hash');
const Model = use('Model');

class User extends Model {
  static boot () {
    super.boot();

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  categories () {
    return this.belongsToMany('App/Models/Category').pivotModel('App/Models/UserCategory');
  }

  userCategories () {
    return this.hasMany('App/Models/UserCategory');
  }
}

module.exports = User;
