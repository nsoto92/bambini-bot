const { MessageAttachment } = require('discord.js');
const nodeHtmlToImage = require('node-html-to-image');

module.exports = async (msg, img, ann) => {

	const _htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background: rgb(22, 22, 22);
        color: #fff;
        max-width: 500px;
      }

      .app {
        padding: 20px;
        display: grid;
        row-gap: 10px;
        border-top: 3px solid #D4AF37;
        background: rgb(31, 31, 31);
        align-items: center;
      }

      .avatar {
          width:70px;
          height: 70px;
          border-radius: 50%;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
        border: 1px solid #D4AF37;
      }

      h3 {
        margin-top: 10px;
      }

      p {
        font-size: 13px;
      }

      .message {
        margin-top: 50px;
        width: 75%;
        margin: auto;
        background: #0e1111;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="app">
    <h3>Anuncio - ${msg.author.username}</h3>
      <div class="avatar">
        <img src="${img}"/>
      </div>
      <div class="message">
        <p>${ann}</p>
      </div>
    </div>
  </body>
</html>
`;
	console.log(img);
	const image = await nodeHtmlToImage({
		html: _htmlTemplate,
		quality: 100,
		puppeteerArgs: {
			args: ['--no-sandbox'],
		},
		encoding: 'buffer',
	});
	// for more configuration options refer to the library
	return msg.channel
		.send(new MessageAttachment(image));
};