const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { flowBotIA } = require("./chatgpt-flow");
const { InventarioApi } = require("../api/inventario-api");
const { flowintermedio } = require("../flows/intermediate-flow");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const flowBienvenida = addKeyword(EVENTS.WELCOME).addAnswer(
    ["Bienvenido a este chatbot!"],
    null,
    async (ctx, { flowDynamic, state, gotoFlow }) => {
        await flowDynamic(
            "Espere un momento por favor, vamos a verificar que usted sea un usuario ..."
        );

        await delay(3000);  // Espera 3 segundos (3000 milisegundos)

        const users = await InventarioApi.obtenerUsuarios();

        const user = users.find((row) => `51${row.phoneNumber}` == ctx.from);

        if (!user) return await flowDynamic("Usted no esta registrado, adios");

        await state.update({ user: user.nombreCompleto });

        //Este flow es para conectar con la IA
        //return gotoFlow(flowBotIA);

        return gotoFlow(flowintermedio);
    },
    //[flowBotIA]
    [flowintermedio]
);

module.exports = { flowBienvenida };