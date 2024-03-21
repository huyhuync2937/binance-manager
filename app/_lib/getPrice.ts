import { RestMarketTypes, Spot } from "@binance/connector-typescript";

export async function GetPrice(nameAsset: string) {
    const BASE_URL = process.env.BASE_URL;
    const client = new Spot("", "", { baseURL: BASE_URL });
    try {

    return  (await client.currentAveragePrice(nameAsset)).price;
     
  } catch (error) {
    console.error(error);
    return 0;
  }
}
