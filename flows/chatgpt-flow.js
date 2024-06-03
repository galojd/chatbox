const ChatGPTClass = require("../chatgpt.class");
const { join } = require("path");
const { readFileSync } = require("fs");
const { addKeyword } = require("@bot-whatsapp/bot");
const { flowReporteSelecionar } = require("./report-selection-flow");

const chatGPT = new ChatGPTClass();

const getPrompt = async () => {
    const pathPromp = join(process.cwd(), "promps");
    const text = readFileSync(join(pathPromp, "01_TECNICO.txt"), "utf-8");
    return text;
};

const flowBotIA = addKeyword("CHAT_BOT_IA_CHATGPT", {
    sensitive: true,
})
    .addAction(async (_, { flowDynamic, state }) => {
        const data = await getPrompt();

        await chatGPT.handleMsgChatGPT(data);

        const textFromAI = await chatGPT.handleMsgChatGPT(
            `cliente="${state.get("user")}"`
        );

        await flowDynamic(textFromAI.text);
    })
    .addAnswer(
        `¿Te interesa?`,
        { capture: true },
        async (ctx, { fallBack }) => {
            const textFromAI = await chatGPT.handleMsgChatGPT(ctx.body);
            return fallBack(textFromAI.text);
        },
        [flowReporteSelecionar]
    );

module.exports = { flowBotIA };
