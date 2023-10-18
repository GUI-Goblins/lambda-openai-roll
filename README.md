# Lambda OpenAI Roll

> This lambda function appends an endGame property to the event body if the OpenAI response has options lengths of 4. This endGame property has a value of either True or False. True has a chance of being 4% while False is 96%.

## Installation

> Start with: `npm install`

## Usage

> To test, use: `npm test`

Request Example:
```javascript
{
"user": {
	"name": STRING,
	"race": STRING,
	"class": STRING,
	"age": NUMBER,
}
"scene": NULL, // default
"options": [ optionA, optionB, optionC, optionD ],
"userChoice": NULL // default,
"roll": FALSE // default,
}
```

Response Example:
```javascript
{
"user": {
	"name": STRING,
	"race": STRING,
	"class": STRING,
	"age": NUMBER,
}
"options": [ optionA, optionB, optionC, optionD ]
"endOptions": [ endA , endB, endC, endD ]
"endGame": False
}
```

## UML Diagram

![UML Diagram](https://projects.invisionapp.com/freehand/document/Og97QVUVy)

## Repository link

[Repo Link](https://github.com/GUI-Goblins/lambda-openai-roll)

## Contributor(s)

- Chester Lee Coloma
- ChatGPT helped with tests
