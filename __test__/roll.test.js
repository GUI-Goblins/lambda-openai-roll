const { handler } = require('../index.js'); 

describe('handler function', () => {
  test('should return a valid response with only deathOption if requestBody has a "roll" property', () => {
    const event = {
      body: JSON.stringify({
        roll: true,
        deathOption: 'Game Over', // Simulate a requestBody with a "roll" property
      }),
    };

    const response = handler(event);
    const responseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(responseBody).toEqual('Game Over');
  });

  test('should return a valid response with "endGame" property if "roll" is not in requestBody', () => {
    const event = {
      body: JSON.stringify({
        options: [1, 2, 3], // Simulate a requestBody without "roll" property
      }),
    };

    const response = handler(event);
    const responseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(responseBody.options).toEqual([1, 2, 3]);
    expect(responseBody).toHaveProperty('roll');
  });

  test('should handle JSON parsing errors and return a 500 status code', () => {
    const event = {
      body: 'invalid-json', // Simulate an invalid JSON string
    };

    const response = handler(event);

    expect(response.statusCode).toBe(500);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Internal Server Error');
  });
});
