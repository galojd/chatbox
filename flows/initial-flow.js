const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { flowBotIA } = require("./chatgpt-flow");
const { InventarioApi } = require("../api/inventario-api");

const flowBienvenida = addKeyword(EVENTS.WELCOME).addAnswer(
    ["Bienvenido a este chatbot!"],
    null,
    async (ctx, { flowDynamic, state, gotoFlow }) => {
        await flowDynamic(
            "Espere un momento por favor, vamos a verificar que usted sea un usuario ..."
        );

        // const users = await InventarioApi.obtenerUsuarios();

        // const user = users.find((row) => `51${row.phoneNumber}` == ctx.from);

        // if (!user) return await flowDynamic("Usted no esta registrado, adios");

        await state.update({ user: "Marco Cuenca" });

        return gotoFlow(flowBotIA);
    },
    [flowBotIA]
);

module.exports = { flowBienvenida };