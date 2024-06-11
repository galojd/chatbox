const { addKeyword } = require("@bot-whatsapp/bot");
const { flowReporteSelecionar } = require("./report-selection-flow");
const { flujoFinal } = require("./final-flow");

const flowdesicion2 = addKeyword('Flow_desicion_2')
    .addAnswer('desea realizar otra operación')
    .addAnswer("responda 'otro' si desea otra operación o 'finalizar' si desea terminar",
        { capture: true },
        async (ctx, { fallBack, gotoFlow }) => {
            //se maneja la respuesta del usuario aqui
            
            if (ctx.body.toLowerCase() == "otro") {
                return gotoFlow(flowReporteSelecionar);
            }
            if(ctx.body.toLowerCase() == "finalizar"){
                return gotoFlow(flujoFinal);
            }
            return fallBack("Lo siento, no entendí tu respuesta, debe escribir otro o finalizar");
          },
          //[flowReporteSelecionar, flujoFinal]
    );
    module.exports = { flowdesicion2 };