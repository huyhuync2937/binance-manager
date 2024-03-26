import { GetTotalAsset } from "@/app/_lib/getTotalAsset";
import Link from "next/link";

export default async function DetailAsset({
  params: { id },
}: {
  params: { id: any };
}) {
  const asset = await GetTotalAsset();
  const item = asset.filter((x) => x.asset === id)[0];
  return (
    <>
      <main className="w-screen h-full flex">
        <div className=" flex flex-row">
          <div className="basic 1/3 m-3">
            <div>Symbol</div>
            <div>{item.asset}</div>

            <Link href={'/ui/asset'}>Back</Link>
          </div>
          <div className="basic 1/3 m-3">
            <div>Buy Amont</div>
            <div>{item.buyAmont.toFixed(3)}</div>

            <div>Buy Total</div>
            <div>{item.buyTotal.toFixed(3)}</div>

            <div>Average Buy</div>
            <div>{item.averageBuy.toFixed(3)}</div>
          </div>
          <div className="basic 1/3 m-3">
            <div>Sell Amount</div>
            <div>{item.sellAmount.toFixed(3)}</div>

            <div>Sell Total</div>
            <div>{item.sellTotal.toFixed(3)}</div>

            <div>Average Sell</div>
            <div>{item.averageSell.toFixed(3)}</div>
          </div>
          <div className=" basic 1/3 m-3">
            <div> Position</div>
            <div>{item.position.toFixed(3)}</div>

            <div>Total Postion Cost</div>
            <div>{item.totalPostionCost.toFixed(3)}</div>

            <div>Avarage Position Price</div>
            <div>{item.averagePositionPrice.toFixed(3)}</div>
          </div>
          <div className=" basic 1/3 m-3">
            <div>----</div>
            <div>----</div>

            <div>Latest Position Value</div>
            <div>{item.lastestPossion.toFixed(3)}</div>

            <div>Current Price</div>
            <div>{item.priceCurrent.toFixed(3)}</div>
          </div>
          <div className=" basic 1/3 m-3">
            <div>----</div>
            <div>----</div>

            <div>Realized PNL</div>
            <div>{item.realizedPNL.toFixed(3)}</div>

            <div>Unrealized PNL</div>
            <div className="text-red">
              {item.unrealizedPNL.toFixed(3) +
                " ( " +
                item.percenUnrealizedPNL.toFixed(3) +
                "% ) "}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
