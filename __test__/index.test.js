const { handler } = require('../index.js');

describe('handler function', () => {
  test('should return a valid response with endGame property if requestBody options length is 4', () => {
    const event = {
      body: JSON.stringify({
        options: [1, 2, 3, 4], // Simulate a requestBody with options length 4
      }),
    };

    const response = handler(event);
    const responseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(responseBody.options).toEqual([1, 2, 3, 4]);
    expect(responseBody).toHaveProperty('endGame');
  });

  test('should return a valid response without endGame property if requestBody options length is not 4', () => {
    const event = {
      body: JSON.stringify({
        options: [1, 2, 3], // Simulate a requestBody with options length not equal to 4
      }),
    };

    const response = handler(event);
    const responseBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(responseBody.options).toEqual([1, 2, 3]);
    expect(responseBody).not.toHaveProperty('endGame');
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
