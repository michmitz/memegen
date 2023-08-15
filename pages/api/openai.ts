import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const generateImage = async () => {
  try {
    const response = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "512x512",
    });
    const image_url = response.data.data[0].url;
    console.log("IMAGE URL", image_url)
    return image_url
  } catch (err) {
    console.log("ERROR:", err)
    return err
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await generateImage()

  res.status(200).json({response})
}
