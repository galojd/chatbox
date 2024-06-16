const { join } = require("path");
const { readFileSync } = require("fs");
const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const { flowReporteSelecionar } = require("./report-selection-flow");

const flowintermedio = addKeyword("INTERMEDIATE_FLOW")
.addAnswer('¿Qué te interesa?')
.addAnswer('Puede realizar la operación que desee escribiendo "solicito".',
  // Espera a que el cliente responda
  { capture: true },
  async (ctx, { fallBack, gotoFlow }) => {
    // Se maneja la respuesta del usuario aquí
    if (ctx.body.toLowerCase() === "solicito") {
      return gotoFlow(flowReporteSelecionar);
    } else {
      return fallBack("Lo siento, no entendí su respuesta. Debe escribir 'solicito' para visualizar las opciones disponibles.");
    }
  },
  [flowReporteSelecionar]
);
module.exports = {flowintermedio};