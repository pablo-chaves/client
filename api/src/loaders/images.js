const { v4: uuidv4 } = require('uuid');
const rawData = require('./rawData');
const properties = require('./properties');

const propertiesId = properties.map((p) => p.id);
const images = rawData.map(({ imageLink }) => ({
  id: uuidv4(),
  photo: imageLink || 'https://metrocuadrado.blob.core.windows.net/inmuebles/4405-M2856916/4405-M2856916_2_p.jpg',
  propertyId: propertiesId.pop(),
}));

module.exports = images;