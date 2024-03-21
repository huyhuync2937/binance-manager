import { Spot, RestTradeTypes } from "@binance/connector-typescript";
import { useState } from "react";

export async function GetOrderHistory(nameAsset: string) {
  const API_KEY = process.env.API_KEY;
  const API_SECRET = process.env.API_SECRET;
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
