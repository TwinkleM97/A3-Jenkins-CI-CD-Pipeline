const handler = async (context, request) => {
  const name = request.query.name || (request.body && request.body.name);

  if (name) {
    context.res = {
      status: 200,
      body: `Hello, ${name}!`
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string'
    };
  }
};

module.exports = {
  handler
};
