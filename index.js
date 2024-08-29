const puppeteer = require('puppeteer-core');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize Puppeteer and launch the browser
(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Create a new client instance and pass the browser instance
  const client = new Client({
    puppeteer: { 
      browser: browser // Use the Puppeteer instance
    }
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  // Listening to all incoming messages
  client.on('message_create', message => {
    console.log(message.body);
  });

  client.on('message_create', message => {
    if (message.body === 'hii') {
      // send back "pong" to the chat the message was sent in
      client.sendMessage(message.from, 'pong');
    }
  });

  // Initialize the WhatsApp client
  await client.initialize();
})();
