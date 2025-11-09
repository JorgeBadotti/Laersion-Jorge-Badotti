// services/geminiService.ts
import { GoogleGenAI, Modality } from "@google/genai";
import { ClothingItem, GeneratedLook, Measurements } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Converte uma string base64 em um objeto de dados que a API Gemini pode usar.
const fileToGenerativePart = (base64Data: string, mimeType: string) => {
    return {
      inlineData: {
        data: base64Data.split(',')[1],
        mimeType,
      },
    };
};

/**
 * Gera looks combinando uma imagem do usuário, peças de roupa e um estilo.
 * O processo ocorre em duas etapas para melhores resultados:
 * 1. Geração de Descrições: Um modelo de texto avançado (gemini-2.5-pro) cria descrições textuais
 *    detalhadas dos looks, decidindo quais peças combinar com base no estilo.
 * 2. Geração de Imagens: Um modelo de imagem (gemini-2.5-flash-image) usa as descrições e as imagens
 *    fornecidas para criar uma representação visual realista de cada look.
 */
export const generateLook = async (
    userImage: string,
    items: ClothingItem[],
    style: string
): Promise<GeneratedLook[]> => {
    // Etapa 1: Gerar descrições dos looks com um modelo de texto para melhor raciocínio.
    const descriptionPrompt = `
        Você é um personal stylist. Baseado nas peças de roupa a seguir e no estilo desejado, crie 3 looks únicos.
        Para cada look, forneça um nome criativo, uma breve descrição de uma frase e uma lista EXATA dos nomes das peças de roupa utilizadas.
        
        Peças de roupa disponíveis:
        ${items.map(item => `- ${item.name} (categoria: ${item.category})`).join('\n')}
        
        Estilo desejado: "${style}"

        Sua resposta DEVE ser um objeto JSON contendo uma única chave "looks", que é um array de 3 objetos. 
        Cada objeto deve ter as chaves "name" (string), "description" (string), e "itemsUsed" (um array de strings com os nomes das peças).
    `;

    const descriptionResult = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: [{role: 'user', parts: [{text: descriptionPrompt}]}],
        config: { responseMimeType: "application/json" }
    });

    let lookDescriptions;
    try {
        const parsedJson = JSON.parse(descriptionResult.text);
        lookDescriptions = parsedJson.looks;
        if (!Array.isArray(lookDescriptions) || lookDescriptions.length === 0) {
            throw new Error("Formato de descrição inválido ou vazio.");
        }
    } catch (e) {
        console.error("Falha ao analisar JSON para descrições de looks:", descriptionResult.text);
        throw new Error("Não foi possível gerar as descrições dos looks. A resposta do modelo foi inválida.");
    }
    
    // Etapa 2: Gerar uma imagem para cada look descrito.
    const userMimeType = userImage.substring(userImage.indexOf(":") + 1, userImage.indexOf(";"));
    const userImagePart = fileToGenerativePart(userImage, userMimeType);

    // Função auxiliar para obter o MIME type de uma string base64
    const getMimeTypeFromB64 = (b64: string) => b64.substring(b64.indexOf(":") + 1, b64.indexOf(";"));
    
    // Filtra apenas os itens que serão usados nos looks para otimizar a chamada da API
    const allItemsUsed = new Set(lookDescriptions.flatMap(look => look.itemsUsed));
    const relevantItems = items.filter(item => allItemsUsed.has(item.name));
    const itemImageParts = relevantItems.map(item => fileToGenerativePart(item.imageUrl, getMimeTypeFromB64(item.imageUrl)));


    const generatedLooks: GeneratedLook[] = [];

    for (const look of lookDescriptions) {
        const imagePrompt = `
            Gere uma imagem fotorrealista da pessoa na primeira imagem (usuário) vestindo um look.
            O look é composto pelas seguintes peças: ${look.itemsUsed.join(', ')}. As imagens dessas peças são fornecidas a seguir.
            O estilo do look é: "${look.name} - ${look.description}".
            O fundo deve ser neutro ou um ambiente que combine com o estilo.
            O rosto da pessoa deve ser o mesmo da imagem original. A imagem deve ser de corpo inteiro.
        `;

        const imageGenResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{text: imagePrompt}, userImagePart, ...itemImageParts] },
            config: { responseModalities: [Modality.IMAGE] }
        });
        
        const imagePart = imageGenResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (imagePart?.inlineData) {
            const { data, mimeType } = imagePart.inlineData;
            generatedLooks.push({
                name: look.name,
                description: look.description,
                imageUrl: `data:${mimeType};base64,${data}`
            });
        }
    }
    
    if (generatedLooks.length === 0) {
        throw new Error("Não foi possível gerar imagens para os looks. Tente novamente.");
    }

    return generatedLooks;
};

/**
 * Analisa uma imagem de usuário para estimar o tipo de corpo e as medidas.
 */
export const analyzeImageForStyleProfile = async (
    userImage: string
): Promise<{ bodyType: string, measurements: Measurements }> => {
    const mimeType = userImage.substring(userImage.indexOf(":") + 1, userImage.indexOf(";"));
    const imagePart = fileToGenerativePart(userImage, mimeType);

    const prompt = `
        Analise a imagem de corpo inteiro fornecida e estime o tipo de corpo da pessoa e suas medidas corporais em centímetros.
        Para o tipo de corpo, escolha UMA das seguintes opções: 'retangulo', 'triangulo', 'triangulo-invertido', 'ampulheta', 'oval'.
        Para as medidas, forneça estimativas numéricas para: busto, cintura, quadris, comprimento do braço (ombro ao pulso), comprimento da perna (quadril ao tornozelo) e altura total.

        Sua resposta DEVE ser um objeto JSON com o seguinte formato:
        {
          "bodyType": "...",
          "measurements": { "bust": <number>, "waist": <number>, "hips": <number>, "armLength": <number>, "legLength": <number>, "height": <number> }
        }
        Não inclua nenhuma explicação, markdown ou qualquer texto fora do objeto JSON.
    `;

    const result = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: { parts: [ {text: prompt}, imagePart ] },
        config: { responseMimeType: 'application/json' }
    });

    try {
        const parsed = JSON.parse(result.text);
        
        // Garante que todas as medidas sejam strings para consistência no estado do formulário.
        // FIX: Cast to 'unknown' first to satisfy TypeScript's type checking for specific object shapes.
        const measurements = Object.fromEntries(
            Object.entries(parsed.measurements).map(([key, value]) => [key, String(value ?? '')])
        ) as unknown as Measurements;

        return {
            bodyType: parsed.bodyType,
            measurements: measurements,
        };
    } catch (e) {
        console.error("Falha ao analisar JSON da análise de imagem:", result.text);
        throw new Error("A análise da imagem falhou. Verifique se a imagem é de corpo inteiro e bem iluminada.");
    }
};