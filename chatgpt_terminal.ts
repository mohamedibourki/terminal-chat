import { ClientOptions, OpenAI } from "openai";
import * as readlineSync from "readline-sync";

// Replace with your actual API key
const apiKey =
  "api_key";

// Initialize the OpenAI client
const client = new OpenAI({
  apiKey: apiKey,
} as ClientOptions);

async function chatGpt(prompt: string): Promise<string> {
  try {
    // Call OpenAI API (using the chat completion endpoint)
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const choice = response.choices[0];

    if (choice && choice.message && choice.message.content) {
        return choice.message.content.trim();
    } else {
        return "No response";
    }
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}

async function main() {
  console.log("Welcome to ChatGPT CLI! Type 'exit' to quit.");

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit") {
      break;
    }

    const response = await chatGpt(userInput);
    console.log(`ChatGPT: ${response}`);
  }
}

main().catch(console.error);
