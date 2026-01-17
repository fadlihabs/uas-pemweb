
import { GoogleGenAI } from "@google/genai";
import { Course, Task } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStudyRecommendation = async (courses: Course[], tasks: Task[]) => {
  const prompt = `
    Analyze this student's schedule and workload to provide a personalized study plan for today.
    
    COURSES:
    ${courses.map(c => `- ${c.name} (${c.day} at ${c.time})`).join('\n')}
    
    PENDING TASKS/DEADLINES:
    ${tasks.filter(t => t.status !== 'completed').map(t => `- ${t.title} for ${t.courseId} due on ${t.deadline}`).join('\n')}
    
    Please provide:
    1. 3 Priority focus areas.
    2. A suggested hourly timeline for today (study sessions).
    3. A motivational tip based on the current load.
    
    Return the response in JSON format:
    {
      "priorities": ["string", "string", "string"],
      "schedule": [
        {"time": "HH:MM", "activity": "string", "duration": "string"}
      ],
      "advice": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
