// middleware.js

import {
  Spot,
  RestWalletTypes,
  AccountSnapshotType,
  RestTradeTypes,
} from "@binance/connector-typescript";

export async function TryFunction() {
  const API_KEY = process.env.API_KEY;
  const API_SECRET = process.env.API_SECRET;
  const BASE_URL = process.env.BASE_URL;

  const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });
  const array:any = []
  const options: RestTradeTypes.accountTradeListOptions = {
    limit: 5,
    recvWindow: 5000,
  };


  // client.accountTradeList('LAZIOUSDT', options).then((res: RestTradeTypes.accountTradeListResponse[]) => {
  //     console.log( res);
  // }).catch(err => { console.log(err); });
  // client.allOrders('LAZIOUSDT', options).then((res: RestTradeTypes.allOrdersResponse[]) => {
  //   console.log(res);
  // }).catch(err => { console.log(err); });
 return  client
    .accountTradeList("SNXUSDT", options)
   
}
