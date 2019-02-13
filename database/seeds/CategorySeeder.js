'use strict';

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');
const Category = use('App/Models/Category');

class CategorySeeder {
  async run () {
    await Category.create({ name: 'Front-end' });
    await Category.create({ name: 'Back-end' });
    await Category.create({ name: 'Mobile' });
    await Category.create({ name: 'DevOps' });
    await Category.create({ name: 'Gestão' });
    await Category.create({ name: 'Marketing' });
  }
}

module.exports = CategorySeeder;
