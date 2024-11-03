const validateBookData = (pageCount, readPage) => {
    if (readPage > pageCount) {
      return 'readPage tidak boleh lebih besar dari pageCount';
    }
    return null;
  };
  
  module.exports = validateBookData;
  