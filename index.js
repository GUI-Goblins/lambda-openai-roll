'use strict';

exports.handler = (event) => {
  console.log('HERE IS THE EVENT OBJECT FROM OPEN_AI_REQUEST', event);
  try {
    const requestBody = JSON.parse(event.body);

    if (requestBody.roll) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(requestBody.deathOption),
      };
      return response;
    } else {
      const endGame = Math.random() < 0.04; // 4% chance of true
      requestBody.roll = endGame;
      const response = {
        statusCode: 200,
        body: JSON.stringify(requestBody),
      };

      return response;
    }
  } catch (error) {
    console.error('Error appending endGame property to requestBody', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
