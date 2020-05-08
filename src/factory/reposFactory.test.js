import reposFactory from './reposFactory';

test('should return an object', () => {
  expect.assertions(4);
  expect(typeof reposFactory).toBe('object');
  expect(reposFactory).toHaveProperty('DatabaseService');
  expect(reposFactory).toHaveProperty('EmailService');
  expect(reposFactory.DatabaseService).toHaveProperty('UserRepo');
});
