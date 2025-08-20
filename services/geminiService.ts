
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectIdea } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            titulo: {
                type: Type.STRING,
                description: "O nome do projeto.",
            },
            descricao: {
                type: Type.STRING,
                description: "Uma breve descrição do projeto, explicando como ele combina as paixões e habilidades.",
            },
        },
        required: ["titulo", "descricao"],
    },
};

export const generateProjectIdeas = async (passions: string, skills: string): Promise<ProjectIdea[]> => {
    const prompt = `
      Com base nas seguintes paixões e habilidades, gere exatamente 3 ideias de projetos com propósito. 
      Cada ideia deve ter um título criativo e uma breve descrição que explique como o projeto conecta a paixão com a habilidade.
      O tom deve ser inspirador e encorajador.

      Paixões: "${passions}"
      Habilidades: "${skills}"

      Forneça a resposta estritamente no formato JSON, seguindo o schema definido.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);

        if (!Array.isArray(parsedResponse)) {
            throw new Error("A resposta da IA não está no formato de array esperado.");
        }

        return parsedResponse as ProjectIdea[];

    } catch (error) {
        console.error("Erro na chamada da API Gemini:", error);
        throw new Error("Falha ao gerar ideias de projeto a partir da IA.");
    }
};
