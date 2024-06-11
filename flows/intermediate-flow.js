const { join } = require("path");
const { readFileSync } = require("fs");
const { addKeyword } = require("@bot-whatsapp/bot");
const { flowReporteSelecionar } = require("./report-selection-flow");

const flowintermedio = addKeyword("INTERMEDIATE_FLOW").addAnswer(
  `¿Que te interesa?`,
  //Espera a que el cliente responda
  { capture: true },
  async (ctx, { fallBack, gotoFlow }) => {
    //se maneja la respuesta del usuario aqui
    
    if (ctx.body.toLowerCase() == "reporte") {
      return gotoFlow(flowReporteSelecionar);
    }
    return fallBack("Lo siento, no entendí tu respuesta, debe escribir reporte");
  },
  [flowReporteSelecionar]
);


module.exports = {flowintermedio};