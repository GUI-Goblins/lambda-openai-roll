const {handler} = require('../index');

describe('handler function', () => {
    it('should return a 500 when an error happens', async () => {
        const event = '{' //invalid string
        const response = await handler(event);
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).message).toBe('Internal Server Error');
    });
    it ('should bring back a 200 and deathScene when the roll is true', async () => {
        const event = {
            roll: true,
            deathScene: 'Some death scene',
        };
        const response = await handler(JSON.stringify(event));
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify(event.deathScene));
    });
    it('should bring back a 200 code and requestBody when the roll is false', async () => {
        const event = {
            roll: false,
            userChoice: 'Whatever choice',
        };
        const response = await handler(JSON.stringify(event));
        const responseBody = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(responseBody.roll === null || typeof response.body.roll === 'boolean').toBeTruthy(); //either or
        expect(responseBody.userChoice).toBe(event.userChoice);
    });
    it('should handle the event as an object', async () => {
        const event = {
            roll: false,
            userChoice: 'Whatever choice',
        };
        const response = await handler(event);
        const responseBody = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(responseBody.roll === null || typeof response.body.roll === 'boolean').toBeTruthy(); //either or
        expect(responseBody.userChoice).toBe(event.userChoice);
    });
});
// help from jacob with the logic for testing booleans for truthy values