const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoFinal } = require("./final-flow");
const { InventarioApi } = require("../api/inventario-api");

const flowReporteSelecionar = addKeyword("reporte_chat_bot")
  .addAnswer("Apreciado/a", null, async (_, { flowDynamic, state }) => {
    const myState = state.getMyState();
    await flowDynamic(`${myState.user}`);
    await flowDynamic(`¿Qué reporte te interesa?`);
    await flowDynamic(`"Estos son los tipos de reportes disponibles: (Marque 1 , 2 o 3)`);
    await flowDynamic("1. Reporte producto");
    await flowDynamic("2. Reporte stock");
    await flowDynamic("3. Reporte de solo Productos con bajo stock");
    await flowDynamic("Si desea terminar la conversación, escriba 'finalizar'");
  })
  .addAction(
    { capture: true, idle: 10000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      if (ctx?.idleFallBack) {
        return gotoFlow(flujoFinal);
      }

      let outputFilePath;
      const opcion = parseInt(ctx.body);

      switch (opcion) {
        case 1:
          outputFilePath = await InventarioApi.obtenerReporteProducto();
          break;
        case 2:
          outputFilePath = await InventarioApi.obtenerReporteStock();
          break;
        case 3:
          outputFilePath = await InventarioApi.obtenerProductoBajo();
          break;
        default:
          await flowDynamic("Opción inválida. Por favor marque 1 , 2 o 3.");
          return;
      }

      if (outputFilePath) {
        await flowDynamic([{ body: "Su PDF", media: outputFilePath }]);
        return gotoFlow(flujoFinal);
      } else {
        await flowDynamic(
          "Hubo un problema al generar el reporte. Por favor, intenta de nuevo."
        );
      }
    }
  );

module.exports = { flowReporteSelecionar };
