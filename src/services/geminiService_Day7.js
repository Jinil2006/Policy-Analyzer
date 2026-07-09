// Day 7
export const analyzePolicyWithGemini = async (policyText) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API key is missing (Day 7). Please make sure VITE_GEMINI_API_KEY is in your .env file.");
    throw new Error("Gemini API key is missing");
  }

  const prompt = `You are an expert insurance analyst. Analyze the following insurance policy text.
Please extract the key information into exactly this JSON format. Focus on pulling out clear, concise bullet points for categories:
{
  "summary": "A concise 2-3 sentence paragraph summarizing the policy, its primary coverage, and intent.",
  "covered": ["covered item 1", "covered item 2", "covered item 3", "covered item 4", "covered item 5"],
  "notCovered": ["exclusion 1", "exclusion 2", "exclusion 3"],
  "conditions": ["important condition 1", "important condition 2", "important condition 3"],
  "risks": ["major risk or strict limit 1", "major risk or strict limit 2", "major risk or strict limit 3"]
}

Rules:
1. Provide ONLY valid JSON.
2. DO NOT use markdown code block syntax (like \`\`\`json). Just the raw JSON object.
3. Make sure the output is parseable by JSON.parse().
4. Summarize complex terms into simple English.
5. If the text does not contain enough info, provide a generic standard response but ALWAYS stick to the JSON schema.

Here is the policy text:
${policyText.substring(0, 30000)}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "Failed to fetch from Gemini API");
    }

    const data = await response.json();
    let textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResult) {
       throw new Error("Empty response from Gemini API");
    }

    // Clean up potential markdown formatting that the LLM might include despite instructions
    textResult = textResult.replace(/```json/gi, "").replace(/```/g, "").trim();

    return JSON.parse(textResult);

  } catch (error) {
    console.error("Error analyzing policy with Gemini (Day 7):", error);
    throw error;
  }
};
