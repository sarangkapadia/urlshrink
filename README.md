# URL Shrink

Url Shrink is a url shortner, that also offers random advice, like a shrink would ( take it lightly )

The application is built with Node.js, Express, MongoDB, and Redis.

## Features

- Shortens long URLs to short, easily shareable links.
- Utilizes MongoDB for storing URL mappings.
- Implements Redis for caching to improve performance.
- Provides a random piece of advice on each request using an external API.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB and Redis servers.
4. Create a `.env` file with the following variables:
    ```
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    ```
5. Run the application: `npm start`

## Usage

1. Access the application through a web browser.
2. Enter a long URL into the input field and submit.
3. The application will generate a shortened URL.
4. Use the shortened URL to redirect to the original long URL.

## Dependencies

- [Express](https://www.npmjs.com/package/express): Web application framework for Node.js.
- [Mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool.
- [Shortid](https://www.npmjs.com/package/shortid): Library for generating short, unique IDs.
- [Redis](https://www.npmjs.com/package/redis): Redis client for Node.js.
- [Morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for Node.js.
- [EJS](https://www.npmjs.com/package/ejs): Embedded JavaScript templating engine.

## Contributors

- [Sarang Kapadia](https://github.com/sarangkapadia)

