const { flujoFinal } = require("./final-flow");
const { InventarioApi } = require("../api/inventario-api");
const { addKeyword } = require("@bot-whatsapp/bot");


const flowReporteSelecionar = addKeyword("reporte_chat_bot")
  .addAnswer('Si desea verificar un producto en particular escriba el nombre del producto')
  .addAnswer('Tambien tiene la opción de un reporte detallado')
  .addAnswer([
    "¿Que reporte te interesa?",
    "estos son los tipos de reportes disponibles: (Marque 1 , 2 o 3)",
    "1. Reporte producto \n2. Reporte stock \n3. Reporte de solo Productos con bajo stock",
  ])
  .addAnswer("Si desea terminar la conversación escriba 'finalizar'")
  .addAction(
    { capture: true, idle: 10000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      if (ctx?.idleFallBack) {
        return gotoFlow(flujoFinal);
      }

      const userInput = ctx.body.trim();

      if (isNaN(userInput)) {
        try {
          const productos = await InventarioApi.obtenerProducto(userInput);
          if (productos && productos.comentario) {
            await flowDynamic(`Su producto '${userInput}' tiene '${productos.comentario}'.`);
            await flowDynamic(`el umbral minimo es '${productos.stockMinimo}' y tiene el total de '${productos.stocktotal}' cantidad de productos.`);
            return gotoFlow(flujoFinal);
          }if(ctx.body === "finalizar"){
            return gotoFlow(flujoFinal);
          }else {
            await flowDynamic("No se encontró el producto. Por favor, intenta de nuevo.");
            await flowDynamic("ingrese el nombre del producto o las opciones");
            await flowDynamic("1. Reporte producto");
            await flowDynamic("2. Reporte stock");
            await flowDynamic("3. Reporte de solo Productos con bajo stock");
            await flowDynamic("Si desea terminar la conversación escriba 'finalizar'");
            return; 
          }
        } catch (error) {
          await flowDynamic("Hubo un problema al buscar el producto. Por favor, intenta de nuevo ");
          return; 
        }
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
        case 3:
          outputFilePath = await InventarioApi.obtenerProductoBajo();
          break;
        default:
          await flowDynamic("Opción inválida. Por favor marque 1 , 2 o 3.");
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
