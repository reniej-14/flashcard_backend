import axios, { isAxiosError } from "axios"

interface GeneratedQuestion {
    question: string
    response: string
}

export const generateQuestions = async (text: string): Promise<GeneratedQuestion[]> => {
    console.log('Desde generateQuestions')

    const prompt = `
Eres un asistente que crea tarjetas de estudio.

A partir del siguiente texto genera preguntas y respuestas en idioma español.

Reglas:

- Devuelve ÚNICAMENTE un JSON válido.
- No escribas explicaciones.
- No uses markdown.
- El formato debe ser exactamente:

[
  {
    "question": "...",
    "response": "..."
  }
]

Texto:

${text}
`;

    try {
    const { data } = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "cohere/north-mini-code:free",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
        }
    );

    return JSON.parse(data.choices[0].message.content);

    } catch (error) {

        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
        throw error;
    }
}