module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + "! This function executed successfully."
        : "Hello, World! This function executed successfully.";

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            message: responseMessage,
            timestamp: new Date().toISOString()
        }
    };
};