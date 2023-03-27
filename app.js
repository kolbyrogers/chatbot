import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const ui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ui.prompt();
ui.on("line", async (line) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: line }],
    });
    console.log(res.data.choices[0].message.content);
  } catch (err) {
    console.log(err);
  }
  ui.prompt();
});
