import { nanoid } from 'nanoid';
import books from '../../models/book.js';

export const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
  };

  books.push(newBook);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }).code(201);
};

export const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
  }

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),
    },
  });
};

export const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  });
};

export const updateBookById = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const updatedAt = new Date().toISOString();
  books[index] = {
    ...books[index],
    name, year, author, summary, publisher, pageCount, readPage, reading, finished: readPage === pageCount, updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

export const deleteBookById = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  books.splice(index, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};
