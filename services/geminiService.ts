import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI strictly according to guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Abby", the advanced AI consultant for ABsoftware Solutions (https://absoftz.in).
ABsoftware Solutions is a premier software development consultancy specializing in:
- Building complex Web Apps, Dashboards, and MVPs.
- Helping Creative Studios, Corporates, and Startups.
- 0 to 1 Team Hiring and Staff Augmentation.
- Technical expertise in React, Node.js, Python, AI/ML integrations.

Your tone should be:
- Professional yet Creative and Witty.
- Concisely helpful.
- Impressively technical but accessible.

If asked about pricing, say "We offer bespoke engagement models. Let's discuss your project specifics."
If asked about contact, direct them to 'contact@absoftz.in'.
Keep responses under 100 words unless technical detail is requested.
`;

export const streamChatResponse = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview', // Using the fast model for chat
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};