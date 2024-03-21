// middleware.js
import { Spot } from "@binance/connector-typescript";

export async function GetAsset() {
  const API_KEY = process.env.API_KEY;
  const API_SECRET = process.env.API_SECRET;
  const BASE_URL = process.env.BASE_URL;

  const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });
  const res = await client.accountInformation();
 
  return res.balances.filter((asset) => parseFloat(asset.free) > 0);
}
