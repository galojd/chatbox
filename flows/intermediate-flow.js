const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const { flowReporteSelecionar } = require("./report-selection-flow.js");
const { flowReporproducto } = require("./preguntarflow.js")

const flowintermedio = addKeyword("INTERMEDIATE_FLOW")
  .addAnswer("Hola", null, async (_, { flowDynamic, state }) => {
    const myState = state.getMyState();
    await flowDynamic(`Estimado/a ${myState.user}`);
    await flowDynamic(`Puede obtener reportes escribiendo "solicito"`);
    await flowDynamic(`Tambien puede realizar la consulta de un producto ingresando "producto"`);
    await flowDynamic(`Puede terminar la operación escribiendo "finalizar"`);
  })
  .addAnswer(
    ' ¡Qué bueno tenerte por aquí!',
    { capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      switch (ctx.body.toLowerCase()) {
        case "solicito":
          //const { flowReporteSelecionar } = await import("../flows/report-selection-flow.js");
          return gotoFlow(flowReporteSelecionar);
        case "finalizar":
          const { flujoFinal } = await import("../flows/final-flow.js");
          return gotoFlow(flujoFinal);
        case "producto":
          return gotoFlow(flowReporproducto);
        default:
          return fallBack(
            'Lo siento, no entendí su respuesta. Debe escribir "solicito", "producto" o "finalizar".'
          );
      }
    },
    [flowReporteSelecionar, flowReporproducto]
  );

module.exports = { flowintermedio };


