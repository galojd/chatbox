const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

/*const flujoFinal = addKeyword(EVENTS.ACTION).addAnswer(
    "Se canceló la solicitud de reporte por su inactividad"
);*/

const flujoFinal = addKeyword("final")
    .addAnswer("Gracias por usar nuestro servicio. ¡Hasta luego!");

module.exports = { flujoFinal };