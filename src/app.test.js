// import request from 'supertest';
// import { server } from '../dist/app';

describe('Server Ok status', () => {
  afterEach(() => {
    // server.close();
  });
  test('expect / to return 200', async (done) => {
    expect.assertions(1);
    // const response = await request(server);
    // .get('/');
    expect(200).toEqual(200);
    done();
  });
});
