const { addKeyword } = require("@bot-whatsapp/bot");
const { InventarioApi } = require("../api/inventario-api");

const flowReporproducto = addKeyword("reporte_chat_bot")
  .addAnswer("Por favor", null, async (_, { flowDynamic, state }) => {
    const myState = state.getMyState();
    await flowDynamic(`${myState.user}`);
    await flowDynamic(`Tambien tiene la opción.`);
    await flowDynamic(`De terminar la conversación, escribiendo 'finalizar'.`);
  })
  .addAnswer(
    "Ingrese el nombre del producto que desee verificar",
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const userInput = ctx.body.trim();
      console.log(`Usuario ingresó: ${userInput}`); // Debug

      if (userInput.toLowerCase() === "finalizar") {
        const { flujoFinal } = await import("./final-flow.js");
        return gotoFlow(flujoFinal);
      }

      if (isNaN(userInput)) {
        try {
          const productos = await InventarioApi.obtenerProducto(userInput);
          if (productos && productos.comentario) {
            await flowDynamic(`Su producto '${userInput}' tiene '${productos.comentario}'.`);
            await flowDynamic(`El umbral mínimo es '${productos.stockMinimo}' y tiene un total de '${productos.stocktotal}' cantidad de productos.`);
            const { flujoFinal } = await import("./final-flow.js");
            return gotoFlow(flujoFinal);
          } else {
            await flowDynamic("No se encontró el producto. Por favor, intenta de nuevo.");
          }
        } catch (error) {
          await flowDynamic("Hubo un problema al buscar el producto. Por favor, intenta de nuevo.");
        }
      }
    }
  );

module.exports = { flowReporproducto };

