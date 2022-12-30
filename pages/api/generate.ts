import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API Key not configured.",
      },
    });
  }

  const requestText = req.body.text || "";
  if (!requestText) {
    res.status(500).json({
      error: {
        message: "文章を入力してください。",
      },
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(requestText),
      temperature: 0.73,
      max_tokens: 400,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (e: any) {
    if (e.response) {
      console.error(e.response.status, e.response.data);
      res.status(e.response.status).json(e.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${e.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(requestText: string): string {
  return `「${requestText}」とデートに行きます。絶対に盛り上がる話題を理由も含めて詳しく一つ教えて！`;
}
