/******************* Message broker ****************/

const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require(".");

// Create a channel
module.exports.CreateChannel = async() => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    return channel;
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// Publish messages
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// Subscribe messages
module.exports.SubscribeMessage = async (channel, service, binding_key) => {
  try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);

  channel.consume(appQueue.queue, data => {
    console.log('receive data');
    console.log(data.content.toString());
    channel.ack(data);
  })
  } catch (error) {
    res.status(500).json({message: error.message});
  }
  
}