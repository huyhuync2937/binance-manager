import axios from "axios";
import { Spot } from "@binance/connector-typescript";
import { GetAsset } from "../../_lib/getAsset";
import { GetPrice } from "@/app/_lib/getPrice";
import { GetOrderHistory } from "@/app/_lib/getOrderHistory";
export default async function SSR() {
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
  let unrealized_PNL = 0;

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
      avaragePositionPrice: 0,
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

    element.averageSell = element.sellTotal / element.sellAmount;

    // position
    const position = element.buyAmont - element.sellAmount;
    element.position = position > 0 ? position : 0;

    //total position
    const totalPosition = element.buyTotal - element.sellTotal;
    element.totalPostionCost = totalPosition > 0 ? totalPosition : 0;

    //avarage position price
    const avaragePositionPrice = element.totalPostionCost / element.position;
    element.avaragePositionPrice =
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

    unrealized_PNL += (element.priceCurrent - element.averageBuy) * uPnl;


    //percen unPNL
    element.percenUnrealizedPNL = element.unrealizedPNL / element.totalPostionCost * 100

  }
  return (
    <>
      <table className="table-fixed"></table>
      <thead className="">
        <tr>
          <th className=" m-3">Name</th>
          <th className=" m-3"> price Current</th>
          <th className=" m-3"> buy Amont</th>
          <th className=" m-3"> average Buy</th>
          <th className=" m-3"> buy Total</th>
          <th className=" m-3"> lastest Possion</th>
          <th className=" m-3"> sell Amount</th>
          <th className=" m-3"> average Sell</th>
          <th className=" m-3"> sell Total</th>
          <th className=" m-3"> position</th>
          <th className=" m-3"> total Postion Cost</th>
          <th className=" m-3"> avarage Position Price</th>
          <th className=" m-3"> realized PNL</th>
          <th className=" m-3"> unrealized PNL</th>
          <th className=" m-3"> percen Unrealized PNL</th>
        </tr>
      </thead>

      <tbody>
        {newArr.map((item, index) => (
          <tr className="" key={index}>
            <td className=" m-3">{item.asset}</td>
            <td className=" m-3">{item.priceCurrent}</td>
            <td className=" m-3">{item.buyAmont.toFixed(2)}</td>
            <td className=" m-3">{item.averageBuy.toFixed(2)} USDT</td>
            <td className=" m-3">{item.buyTotal.toFixed(2)}</td>
            <td className=" m-3">{item.lastestPossion.toFixed(2)}</td>
            <td className=" m-3">{item.sellAmount.toFixed(2)}</td>
            <td className=" m-3">{item.averageSell.toFixed(2)}</td>
            <td className=" m-3">{item.sellTotal.toFixed(2)}</td>
            <td className=" m-3">{item.position.toFixed(2)}</td>
            <td className=" m-3">{item.totalPostionCost.toFixed(2)}</td>
            <td className=" m-3">{item.avaragePositionPrice.toFixed(2)}</td>
            <td className=" m-3">{item.realizedPNL.toFixed(2)}</td>
            <td className=" m-3">{item.unrealizedPNL.toFixed(2)}</td>
            <td className=" m-3">{item.percenUnrealizedPNL.toFixed(2) +'%'}</td>
          </tr>
        ))}
      </tbody>

      <div className="mt-4 text-red-600/100">
        Total Unrealized PNL {unrealized_PNL}
      </div>
    </>
  );
}
