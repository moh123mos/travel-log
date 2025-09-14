export type LanLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: string;
  label: string;
} & LanLongItem;
