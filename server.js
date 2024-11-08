import Hapi from '@hapi/hapi';
import routes from './app/api/routes/books.js';
const PORT = process.env.PORT;

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada port ${PORT}`);
};

init();
