var AMQP = require('amqp10');

var QueueConsumer = function (processMessage) {
    'use strict';
    var self = {};

    // don't support subjects in the link names
    var amqpClient = new AMQP.Client(AMQP.Policy.merge({
      defaultSubjects: false
    }));

    self.host = function (hostname) {
      self.hostname = hostname;
      return self;
    };

    self.queue = function (queueName) {
      self.queueName = queueName;
      return self;
    };

    self.log = function (line) {
      var time = new Date().toTimeString().split(' ')[0];
      console.log(`[${time}]`, line);
    };

    self.error = function (error) {
      self.log(`Error: ${JSON.stringify(error)}`);
      process.exit();
    };

    self.receive = function () {
      self.log(`Connecting to ${self.hostname.split("@")[1]}`);
      amqpClient.connect(self.hostname).then(() => {
        // create a received from the queue
        return amqpClient.createReceiver(self.queueName);
      }).then((amqpReceiver) => {
        self.log('Waiting for messages...');
        amqpReceiver.on('message', (message) => {
          processMessage(message);
        });
        amqpReceiver.on('errorReceived', (error) => {
          self.error(error);
        });
      });
    };

    self.exit = function () {
      setTimeout(() => {
        amqpClient.disconnect().then(() => {
          self.log('Finished.');
          process.exit();
        });
      }, 2000); // wait for 2 seconds to exit
    };

    return self;
  };

  module.exports = QueueConsumer;