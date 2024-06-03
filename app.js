require("dotenv").config();

const {
  createBot,
  createProvider,
  createFlow,
  EVENTS,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const { flowBienvenida } = require("./flows/initial-flow");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowBienvenida]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot(
    {
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    } // ,
    // {
    //   blackList: ["51986036791"],
    // }
  );

  QRPortalWeb();
};

main();
