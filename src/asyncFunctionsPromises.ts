import request from "request";

/**
 *
 * @param location - Location to look for lat/long coordinates in mapbox API
 * @returns A promise, which in case it is resolved, provides a response from the Mapbox API
 */
export const coordinatesInfoPromises = (location: string) => {
  const url = `http://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1IjoiZWR1c2VncmUiLCJhIjoiY205MDY2aDZoMGo1ZDJocjA1ZTY2dHYyeCJ9.dJrmYDMmeVPotPhQPxeGBA&limit=1`;
  return new Promise<request.Response>((resolve, reject) => {
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.features.length === 0) {
          reject("Mapbox API error: no location found");
        } else {
          resolve(response);
        }
      },
    );
  });
};

/**
 * 
 * @param location - Lat/long coordinates to look for weather info in weatherstack API
 * @returns A promise, which in case it is resolved, provides a response from the weatherstack API
 */
export const weatherInfoPromises = (location: string) => {
  const url = `http://api.weatherstack.com/current?access_key=81f7a73f7be745f0842e79d7cea739caca&query=${encodeURIComponent(location)}&units=m`;
  return new Promise<request.Response>((resolve, reject) => {
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.error) {
          reject(response.body.error.type);
        } else {
          resolve(response);
        }
      },
    );
  });
}
