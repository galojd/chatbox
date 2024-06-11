const { addKeyword } = require("@bot-whatsapp/bot");
const { flowReporteSelecionar2 } = require("./report-selection2-flow");
const { flujoFinal } = require("./final-flow");

const flowdesicion1 = addKeyword('Flow_desicion_1')
    .addAnswer('desea realizar otra operación')
    .addAnswer("responda 'otro' si desea otra operación o 'finalizar' si desea terminar",
        { capture: true },
        async (ctx, { fallBack, gotoFlow }) => {
            //se maneja la respuesta del usuario aqui
            
            if (ctx.body.toLowerCase() == "otro") {
                console.log("si esta entrando");
                return gotoFlow(flowReporteSelecionar2);
            }
            if(ctx.body.toLowerCase() == "finalizar"){
                return gotoFlow(flujoFinal);
            }
            return fallBack("Lo siento, no entendí tu respuesta, debe escribir otro o finalizar");
          },
          [flowReporteSelecionar2]
    );

    module.exports = { flowdesicion1 };
