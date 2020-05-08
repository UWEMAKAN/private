import EmailService from './emailService';

describe('Testing EmailService', () => {
  it('should be an object with a notify method', () => {
    EmailService.notify('test Ok');
    expect.assertions(2);
    expect(EmailService).toBeInstanceOf(Object);
    expect(EmailService.notify).toBeInstanceOf(Function);
  });
});
