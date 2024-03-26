export type AssetCurrent = {
  asset: string;
  free: string;
  locked: string;
  priceCurrent: Number;
  buyAmont: Number;
  averageBuy: Number;
  buyTotal: Number;
  lastestPossion: Number;
  sellAmount: Number;
  averageSell: Number;
  sellTotal: Number;
  position: Number;
  totalPostionCost: Number;
  avaragePositionPrice: Number;
  realizedPNL: Number;
  unrealizedPNL: Number;
  percenUnrealizedPNL: Number;
};

const assetCurrent: AssetCurrent[] = [];

export default assetCurrent;
