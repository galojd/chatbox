require("dotenv").config();

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { InventarioApi } = require("./api/inventario-api");
// const { init } = require("bot-ws-plugin-openai");
const { readFileSync } = require("fs");
const { join } = require("path");
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

// const employeesAddonConfig = {
//   model: "gpt-3.5-turbo",
//   temperature: 0,
//   apiKey: process.env.OPENAI_API_KEY,
// };

// const employeesAddon = init(employeesAddonConfig);

const flujoFinal = addKeyword(EVENTS.ACTION).addAnswer(
  "Se canceló la solicitud de reporte por su inactividad"
);

const flowReporteSelecionar = addKeyword(["reporte"])
  .addAnswer([
    "Que reporte te interesa?",
    "a continuación te envio los tipos de reportes: (Marque 1 o 2)",
    "1. Reporte producto \n2. Reporte stock",
  ])
  .addAction(
    { capture: true, idle: 5000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      if (ctx?.idleFallBack) {
        return gotoFlow(flujoFinal);
      }

      let outputFilePath;
      const opcion = parseInt(ctx.body);

      switch (opcion) {
        case 1:
          outputFilePath = await InventarioApi.obtenerReporteProducto();
        case 2:
          outputFilePath = await InventarioApi.obtenerReporteStock();
      }

      outputFilePath
        ? await flowDynamic([{ body: "Su pdf", media: outputFilePath }])
        : await flowDynamic("Opcion invalida.");
    }
  );

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_TECNICO.txt"), "utf-8");
  return text;
};

const flowBotIA = addKeyword("CHAT_BOT_IA_CHATGPT", {
  sensitive: true,
})
  .addAction(async (_, { flowDynamic, state }) => {
    const data = await getPrompt();

    await chatGPT.handleMsgChatGPT(data);

    const textFromAI = await chatGPT.handleMsgChatGPT(
      `cliente="${state.get("user")}"`
    );

    await flowDynamic(textFromAI.text);
  })
  .addAnswer(
    `¿Te interesa?`,
    { capture: true },
    async (ctx, { fallBack }) => {
      const textFromAI = await chatGPT.handleMsgChatGPT(ctx.body);
      return fallBack(textFromAI.text);
    },
    [flowReporteSelecionar]
  );

const flowBienvenida = addKeyword(EVENTS.WELCOME).addAnswer(
  ["Bienvenido a este chatbot!"],
  null,
  async (ctx, { flowDynamic, state, gotoFlow }) => {
    //sirve para enviar mensajes dinamicos que no estan en un flow
    await flowDynamic(
      "Espere un momento por favor, vamos a verificar que usted sea un usuario ..."
    );

    const users = await InventarioApi.obtenerUsuarios();

    const user = users.find((row) => `51${row.phoneNumber}` == ctx.from);

    if (!user) return await flowDynamic("Usted no esta registrado, adios");

    await state.update({ user: user.nombreCompleto });

    return gotoFlow(flowBotIA);
  },
  [flowBotIA]
);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowBienvenida]);
  const adapterProvider = createProvider(BaileysProvider);

  // const employees = [
  //   {
  //     name: "EMPLEADO_SOPORTE",
  //     description:
  //       "Soy Rob el soporte amable encargado de atender si tienes intencion de descargar o interesado en algun reporte, mis respuestas son breves.",
  //     flow: flowReporteSelecionar,
  //   },
  // ];

  // employeesAddon.employees(employees);

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
