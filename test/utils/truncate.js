const User = use('App/Models/User');
const Category = use('App/Models/Category');
const File = use('App/Models/File');

module.exports = async () => {
  await User.query().delete();
  await Category.query().delete();
  await File.query().delete();
};
