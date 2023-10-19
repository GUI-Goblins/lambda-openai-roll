'use strict';

exports.handler = (event) => {
  console.log('HERE IS THE EVENT OBJECT FROM OPEN_AI_REQUEST', event);
  const response = {
    statusCode: 500,
    body: JSON.stringify('Something went wrong'),
  };
  return response;
  try {
    let requestBody;
    if (typeof event === 'string') {
      requestBody = JSON.parse(event);
    } else {
      requestBody = event;
    }

    if (!requestBody.hasOwnProperty('roll')) {
      requestBody.roll = false; // Add the "roll" property with the initial value of false
    }

    if (!requestBody.hasOwnProperty('userChoice')) {
      requestBody.userChoice = null; // Add the "userChoice" property with the initial value of null
    }

    if (requestBody.roll) {
      response.statusCode = 200;
      response.body = JSON.stringify(requestBody.deathScene);
      // const response = {
      //   statusCode: 200,
      //   // headers: {
      //   //   'Content-Type': 'application/json',
      //   // },
      //   body: JSON.stringify(requestBody.deathScene),
      // };
      console.log("HERE'S THE RESPONSE IF ROLL IS TRUE: ", response);
      // return response;
    } else {
      const endGame = Math.random() < 0.04; // 4% chance of true
      requestBody.roll = endGame;
      response.statusCode = 200;
      response.body = JSON.stringify({
        event: 3,
        payload: 'HELLO FROM CHARACTER ROLL!!',
      });
      // const response = {
      //   statusCode: 200,
      //   // headers: {
      //   //   'Content-Type': 'application/json',
      //   // },
      //   // body: JSON.stringify(requestBody),
      //   body: JSON.stringify({
      //     event: 3,
      //     payload: 'HELLO FROM CHARACTER ROLL!!',
      //   }),
      // };
      console.log("HERE'S THE RESPONSE IF ROLL IS FALSE: ", response);
      // return response;
    }
  } catch (error) {
    console.error('Error appending endGame property to requestBody', error);
    response.statusCode = 500;
    response.body = JSON.stringify({ message: 'Internal Server Error' });
    // return {
    //   statusCode: 500,
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   // },
    //   body: JSON.stringify({ message: 'Internal Server Error' }),
    // };
  }

  return response;
};
