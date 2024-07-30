import { envs } from "../../config";

export class DiscordService {

  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;
  
  constructor(){};

  async notify(message: string){
    const body = {
      content: message,
      embeds: [
        {
          image: {url: 'https://media1.giphy.com/media/pynZagVcYxVUk/giphy.webp?cid=790b7611omug6blxwsrhdsnf0t1qji0n8aeqznu3ouh29zib&ep=v1_gifs_trending&rid=giphy.webp&ct=g'}
        }
      ]
    };
    const response = await fetch(this.discordWebhookUrl,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });;
    if(!response.ok){
      console.log('Error sending message to Discord');
      return false;
    }else{
      return true;
    }
  }

}