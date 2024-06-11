const { flujoFinal } = require("./final-flow");
const { InventarioApi } = require("../api/inventario-api");
const { addKeyword } = require("@bot-whatsapp/bot");
const { flowdesicion1 } = require("./desicion1-flow");

const flowReporteSelecionar = addKeyword("reporte_chat_bot")
  .addAnswer([
    "Que reporte te interesa?",
    "a continuación te envio los tipos de reportes: (Marque 1 o 2)",
    "1. Reporte producto \n2. Reporte stock",
  ])
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
          break; // Agregado para salir del switch después de ejecutar el case
        case 2:
          outputFilePath = await InventarioApi.obtenerReporteStock();
          break; // Agregado para salir del switch después de ejecutar el case
        default:
          await flowDynamic("Opción inválida. Por favor marque 1 o 2.");
          return; // Agregado para salir de la función si la opción es inválida
      }

      /*outputFilePath
        ? await flowDynamic([{ body: "Su pdf", media: outputFilePath }])
        : await flowDynamic("Opcion invalida.");*/

      if (outputFilePath) {
        await flowDynamic([{ body: "Su PDF", media: outputFilePath }]);
        return gotoFlow(flujoFinal);       
      } else {
        await flowDynamic(
          "Hubo un problema al generar el reporte. Por favor, intenta de nuevo."
        );
      }
    },
  );

module.exports = { flowReporteSelecionar };
