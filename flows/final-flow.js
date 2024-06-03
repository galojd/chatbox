const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flujoFinal = addKeyword(EVENTS.ACTION).addAnswer(
    "Se canceló la solicitud de reporte por su inactividad"
);

module.exports = { flujoFinal };