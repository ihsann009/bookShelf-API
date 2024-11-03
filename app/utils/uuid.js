const { nanoid } = require('nanoid');

const generateUuid = () => nanoid(16);

module.exports = generateUuid;
