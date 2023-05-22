import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log('Coming to server', req.body);
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }
  console.log('req.body', req.body);
  const prompt = req.body.prompt || '';
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  try {
    console.log('prompt', prompt);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 4000
    });
    console.log('completion', completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(prompt) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest top three richest person in 2020 that are from ${prompt}.
    `
  //   return `Suggest three names for an animal that is a superhero.

  // Animal: Cat
  // Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  // Animal: Dog
  // Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  // Animal: ${animal}
  // Names:`;
}
