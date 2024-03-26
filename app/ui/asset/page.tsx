import Link from "next/link";
import { GetTotalAsset } from "@/app/_lib/getTotalAsset";
import { cookies } from "next/headers";

export default async function TotalAsset() {
  const cookieStore = cookies()
  const key:any = cookieStore.get('data');
  let obj = JSON.parse(key.value);
  const newArr = await GetTotalAsset();

  const unPNL = newArr.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      (currentItem.unrealizedPNL)
    );
  }, 0);
  return (
    <>
      {/* <main className="container mx-auto">
          <h1 className="text-center text-3xl font-bold my-4"></h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}
      <table className="table-fixed w-full"></table>
      <thead className="">
        <tr>
          <th className=" mx-5 px-5">Name</th>
          <th className="mx-5 px-5"> Price Current</th>
          {/* <th className=" m-3"> buy Amont</th> */}
          <th className=" mx-5 px-5"> Average Buy</th>
          {/* <th className=" m-3"> buy Total</th>
            <th className=" m-3"> lastest Possion</th>
            <th className=" m-3"> sell Amount</th>
            <th className=" m-3"> average Sell</th>
            <th className=" m-3"> sell Total</th>
            <th className=" m-3"> position</th>
            <th className=" m-3"> total Postion Cost</th>
            <th className=" m-3"> avarage Position Price</th>  */}
          <th className=" mx-5 px-5"> Realized PNL</th>
          <th className=" mx-5 px-5"> Unrealized PNL</th>
          <th className=" mx-5 px-5"> Percen Unrealized PNL</th>
          <th className=" mx-5 px-5">Detail</th>
        </tr>
      </thead>

      <tbody>
        {newArr.map((item, index) => (
          <tr className="" key={index}>
            <td className="text-center	 mx-5 px-5">{item.asset}</td>
            <td className="text-center	 mx-5 px-5">
              {item.priceCurrent.toFixed(2)}
            </td>
            {/* <td className=" m-3">{item.buyAmont.toFixed(2)}</td> */}
            <td className="text-center	 mx-5 px-5">
              {item.averageBuy.toFixed(2)}{" "}
            </td>
            {/* <td className=" m-3">{item.buyTotal.toFixed(2)}</td>
              <td className=" m-3">{item.lastestPossion.toFixed(2)}</td>
              <td className=" m-3">{item.sellAmount.toFixed(2)}</td>
              <td className=" m-3">{item.averageSell.toFixed(2)}</td>
              <td className=" m-3">{item.sellTotal.toFixed(2)}</td>
              <td className=" m-3">{item.position.toFixed(2)}</td>
              <td className=" m-3">{item.totalPostionCost.toFixed(2)}</td> */}
            {/* <td className=" m-3">{item.avaragePositionPrice.toFixed(2)}</td> */}
            <td className="text-center	 mx-5 px-5">
              {item.realizedPNL.toFixed(2)}
            </td>
            <td className="text-center	 mx-5 px-5">
              {item.unrealizedPNL.toFixed(2)}
            </td>
            <td className="text-center	 mx-5 px-5">
              {item.percenUnrealizedPNL.toFixed(2) + "%"}
            </td>
            <td className="text-center	 mx-5 px-5">
               <Link href={`/ui/asset/${item.asset}`}>Detail</Link>
            </td>
          </tr>
        ))}
      </tbody>

      <div className="mt-4 text-red-600/100">
        Total Unrealized PNL {unPNL}
      </div>
    </>
  );
}
