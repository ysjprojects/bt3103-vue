import proj4 from "proj4";
import haversine from "haversine-distance";

proj4.defs(
    'EPSG:3414',
    '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs'
);

export const XYToLatLong = (x: number, y: number) => {
    return [proj4("EPSG:3414", "EPSG:4326", [x, y])[1], proj4("EPSG:3414", "EPSG:4326", [x, y])[0]];
};

type LatLongCoord = {
    lat: number,
    lng: number,
}
export const getDistanceBetweenLatLongCoords = (c1: LatLongCoord, c2: LatLongCoord) => {
    return haversine(c1, c2) / 1000.0;
}