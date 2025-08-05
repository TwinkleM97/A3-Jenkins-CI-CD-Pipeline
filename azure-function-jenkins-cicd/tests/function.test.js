const httpFunction = require('../HttpTrigger/index');

describe('Azure Function Tests', () => {
    let context;

    beforeEach(() => {
        context = {
            log: jest.fn(),
            res: {}
        };
    });

    test('should return Hello World message without name parameter', async () => {
        const req = {
            query: {},
            body: {}
        };

        await httpFunction(context, req);

        expect(context.res.status).toBe(200);
        expect(context.res.body.message).toBe("Hello, World! This function executed successfully.");
        expect(context.res.body.timestamp).toBeDefined();
    });

    test('should return personalized message with name parameter', async () => {
        const req = {
            query: { name: 'Jenkins' },
            body: {}
        };

        await httpFunction(context, req);

        expect(context.res.status).toBe(200);
        expect(context.res.body.message).toBe("Hello, Jenkins! This function executed successfully.");
    });

    test('should return correct content type header', async () => {
        const req = {
            query: {},
            body: {}
        };

        await httpFunction(context, req);

        expect(context.res.headers["Content-Type"]).toBe("application/json");
    });
});