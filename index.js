'use strict';

exports.handler = (event) => {
  console.log('HERE IS THE EVENT OBJECT FROM OPEN_AI_REQUEST', event);
  try {
    const requestBody = JSON.parse(event);

    if (!requestBody.hasOwnProperty('roll')) {
      requestBody.roll = false; // Add the "roll" property with the initial value of false
    }

    if (!requestBody.hasOwnProperty('userChoice')) {
      requestBody.userChoice = null; // Add the "userChoice" property with the initial value of null
    }

    if (requestBody.roll) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(requestBody.deathScene),
      };
      console.log("HERE'S THE RESPONSE IF ROLL IS TRUE: ", response);
      return response;
    } else {
      const endGame = Math.random() < 0.04; // 4% chance of true
      requestBody.roll = endGame;
      const response = {
        statusCode: 200,
        // body: JSON.stringify(requestBody),
      };
      console.log("HERE'S THE RESPONSE IF ROLL IS FALSE: ", response);
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
