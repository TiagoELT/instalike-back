import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer, flagAltText) {
    let prompt;
    if (flagAltText) {
        prompt = "Gere pequeno alt text em português do brasil para a seguinte imagem. Na resposta apresente apenas o alt text, não inclua a pergunta.";
    }
    else {
        prompt = "Gere uma breve descrição em português do brasil para a seguinte imagem. Na resposta apresente apenas a descrição, não inclua a pergunta.";
    }
    

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text não disponível.";
    } catch (erro) {
        console.error("Erro ao obter alt-text:", erro.message, erro);
        throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}