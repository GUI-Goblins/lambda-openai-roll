exports.handler = (event) => {
  console.log('HERE IS THE EVENT OBJECT ', event);
  try {
    const requestBody = JSON.parse(event.body);

    if (requestBody.options.length === 4) {
      const endGame = Math.random() < 0.04; // 4% chance of true
      requestBody.endGame = endGame;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(requestBody),
    };

    return response;
  } catch (error) {
    console.error('Error appending endGame property to requestBody', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
