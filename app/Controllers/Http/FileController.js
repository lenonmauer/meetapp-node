'use strict';

const File = use('App/Models/File');
const Helpers = use('Helpers');
const fs = use('fs');
const path = use('path');
const readFile = Helpers.promisify(fs.readFile);

class FileController {
  async show ({ request, response }) {
    const file = await File.find(request.params.id);
    const filePath = path.resolve(Helpers.tmpPath('uploads'), file.name);
    const content = await readFile(filePath);

    return response.header('Content-type', file.type).send(content);
  }

  async store ({ request }) {
    const file = request.file('photo', {
      types: ['image'],
      size: '5mb',
    });

    const filename = `${file.size}-${Date.now()}.${file.extname}`;

    await file.move(Helpers.tmpPath('uploads'), {
      name: filename,
    });

    if (!file.moved()) {
      return file.error();
    }

    const data = {
      name: filename,
      type: `${file.type}/${file.subtype}`,
    };

    const record = await File.create(data);

    return record;
  }
}

module.exports = FileController;
