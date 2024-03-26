import { Spot, RestTradeTypes } from "@binance/connector-typescript";
import { cookies } from "next/headers";
import { useState } from "react";

export async function GetOrderHistory(nameAsset: string) {
  const cookieStore = cookies()
  const key:any = cookieStore.get('data');
  let obj = JSON.parse(key.value);

  const API_KEY = obj.API_KEY;
  const API_SECRET = obj.API_SECRET;
  const BASE_URL = process.env.BASE_URL;

  let historyBuy:{
    sumBuyAmount:number,
    sumBuyTotal: number,
    avaragePrice:number
  }

  const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });

  const options: RestTradeTypes.accountTradeListOptions = {
    limit: 5,
    recvWindow: 5000,
  };
  const date = new Date('10/30/2023');

  const timestamp = date.getTime();
  return (await client.accountTradeList(nameAsset, options)).filter(order => order.time > timestamp)
  
}
