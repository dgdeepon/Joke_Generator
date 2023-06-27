
const express = require('express');
const app = express();
const cors=require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());


const openai = require('openai');
const {Configuration}=require('openai');

const configaration=new Configuration({
    apiKey: process.env.API_KEY
})

const chatGpt = new openai.OpenAIApi(configaration); 



app.post('/chat', (req, res) => {
  const userMessage = req.body.message; 

processUserMessage(userMessage,res);
  
});


async function processUserMessage(userMessage,res) {

    const prompt=`Create funny jokes on this topic : ${userMessage} and finish in 50 words`;
    // console.log(prompt)
  try {
    const response =  await chatGpt.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens:75
    });

    res.send({ message: response.data.choices[0].text });
  } catch (error) {
      console.error('ChatGPT processing error:', error);
      res.send('Oops! An error occurred while processing your message.');
  }
}


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
