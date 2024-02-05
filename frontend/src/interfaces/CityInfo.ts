export default interface CityInfo {
  name: string;
  id: number;
  country: string;
  state: string;
  coord: {
    lat: number;
    lon: number;
  };
}
