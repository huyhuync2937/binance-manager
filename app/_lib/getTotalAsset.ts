// middleware.js
import { Spot } from "@binance/connector-typescript";
import { GetAsset } from "./getAsset";
import { GetPrice } from "./getPrice";
import { GetOrderHistory } from "./getOrderHistory";
export async function GetTotalAsset() {
  const asset = (await GetAsset()).filter(
    (x) =>
      x.asset != "USDT" &&
      x.asset != "WABI" &&
      x.asset != "ETH" &&
      x.asset != "LUNA" &&
      x.asset != "BTC" &&
      x.asset != "BNB" &&
      x.asset != "WTC" &&
      x.asset != "PERL"
  );
  const newArr = asset.map((item) => {
    return {
      ...item,
      priceCurrent: 0,
      buyAmont: 0,
      averageBuy: 0,
      buyTotal: 0,
      lastestPossion: 0,
      sellAmount: 0,
      averageSell: 0,
      sellTotal: 0,
      position: 0,
      totalPostionCost: 0,
      averagePositionPrice: 0,
      realizedPNL: 0,
      unrealizedPNL: 0,
      percenUnrealizedPNL: 0,
    };
  });
  for (let index = 0; index < asset.length; index++) {
    const element = newArr[index];
    const coin = await GetOrderHistory(element.asset.concat("USDT"));

    // price current
    const priceCurrent = await GetPrice(element.asset.concat("USDT"));
    element.priceCurrent += parseFloat(priceCurrent.toString());

    // buy amount
    element.buyAmont = coin.reduce((accumulator, currentItem) => {
      return (
        accumulator + (currentItem.isBuyer ? parseFloat(currentItem.qty) : 0)
      );
    }, 0);

    //buy total
    element.buyTotal = coin.reduce((accumulator, currentItem) => {
      return (
        accumulator +
        (currentItem.isBuyer ? parseFloat(currentItem.quoteQty) : 0)
      );
    }, 0);

    // average Buy
    element.averageBuy = element.buyTotal / element.buyAmont;

    //sell amount
    element.sellAmount = coin.reduce((accumulator, currentItem) => {
      return (
        accumulator + (!currentItem.isBuyer ? parseFloat(currentItem.qty) : 0)
      );
    }, 0);

    //sell total
    element.sellTotal = coin.reduce((accumulator, currentItem) => {
      return (
        accumulator +
        (!currentItem.isBuyer ? parseFloat(currentItem.quoteQty) : 0)
      );
    }, 0);

    //average sell
    
    element.averageSell =element.sellAmount != 0 ? element.sellTotal / element.sellAmount : 0;

    // position
    const position = element.buyAmont - element.sellAmount;
    element.position = position > 0 ? position : 0;

    //total position
    const totalPosition = element.buyTotal - element.sellTotal;
    element.totalPostionCost = totalPosition > 0 ? totalPosition : 0;

    //avarage position price
    const avaragePositionPrice = element.totalPostionCost / element.position;
    element.averagePositionPrice =
      avaragePositionPrice > 0 ? avaragePositionPrice : 0;

    //last position
    element.lastestPossion = element.position * element.priceCurrent;

    //unPNL
    const uPnl = element.position > 0 ? element.position : 0;
    element.unrealizedPNL = (element.priceCurrent - element.averageBuy) * uPnl;

    //PNL
    const pnl =
      element.averageSell - element.averageBuy > 0
        ? element.averageSell - element.averageBuy
        : 0;
    element.realizedPNL = element.sellAmount * pnl;

    
    //percen unPNL
    element.percenUnrealizedPNL =
      (element.unrealizedPNL / element.totalPostionCost) * 100;
  }
  return newArr;
}
