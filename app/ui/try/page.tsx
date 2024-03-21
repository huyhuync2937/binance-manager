
 import { TryFunction } from "@/app/_lib/tryFunction";

export default async function Try() {
  const asset = await TryFunction();
  let time: number = asset[0].time; 

let date: Date = new Date(time);
  console.log( date)
  return (
    <>
     
    </>
  );
}
