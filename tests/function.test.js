const { handler } = require('../src/functions/HttpTrigger');

describe('HttpTrigger function', () => {
  it('should return greeting with name from query', async () => {
    const context = {};
    const request = {
      query: {
        name: 'Twinkle'
      }
    };

    await handler(context, request);

    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Hello, Twinkle!');
  });

  it('should ask for name if not provided', async () => {
    const context = {};
    const request = {
      query: {}
    };

    await handler(context, request);

    expect(context.res.status).toBe(400);
    expect(context.res.body).toBe('Please pass a name on the query string');
  });
});
