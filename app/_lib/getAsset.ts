// middleware.js
import { Spot } from "@binance/connector-typescript";
import { cookies } from "next/headers";

export async function GetAsset() {
  const cookieStore = cookies()
  const key:any = cookieStore.get('data');
  let obj = JSON.parse(key.value);

  const API_KEY = obj.API_KEY;
  const API_SECRET = obj.API_SECRET;
  const BASE_URL = process.env.BASE_URL;

  const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });
  const res = await client.accountInformation();
 
  return res.balances.filter((asset) => parseFloat(asset.free) > 0);
}
