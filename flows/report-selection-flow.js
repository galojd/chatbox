const { flujoFinal } = require("./final-flow");
const { InventarioApi } = require("../api/inventario-api");
const { addKeyword } = require("@bot-whatsapp/bot");

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
                case 2:
                    outputFilePath = await InventarioApi.obtenerReporteStock();
            }

            outputFilePath
                ? await flowDynamic([{ body: "Su pdf", media: outputFilePath }])
                : await flowDynamic("Opcion invalida.");
        }
    );

module.exports = { flowReporteSelecionar };