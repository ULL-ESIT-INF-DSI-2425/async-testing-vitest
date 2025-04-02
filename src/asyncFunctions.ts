import request from "request";

/**
 *
 * @param location - Location to look for lat/long coordinates in mapbox API
 * @param callback - Handler to manage the potential response from mapbox API
 */
export const coordinatesInfo = (
  location: string,
  callback: (
    err: string | undefined,
    data: request.Response | undefined,
  ) => void,
) => {
  const url = `http://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1IjoiZWR1c2VncmUiLCJhIjoiY204eWRqdWpwMDAxcTJrcXlqczRmODVhdiJ9.IkwG4JnMDe6CnQWrmU0aew&limit=1`;

  request({ url: url, json: true }, (error: Error, response) => {
    if (error) {
      callback(`Mapbox API is not available: ${error.message}`, undefined);
    } else if (response.body.features.length === 0) {
      callback(`Mapbox API error: no location found`, undefined);
    } else {
      callback(undefined, response);
    }
  });
};

/**
 *
 * @param location - Lat/long coordinates to look for weather info
 * @param callback - Handler to manage the potential response from weatherstack API
 */
export const weatherInfo = (
  location: string,
  callback: (
    err: string | undefined,
    data: request.Response | undefined,
  ) => void,
) => {
  const url = `http://api.weatherstack.com/current?access_key=d54827295dcf5f75287ecc9c287ff2a3&query=${encodeURIComponent(location)}&units=m`;

  request({ url: url, json: true }, (error: Error, response) => {
    if (error) {
      callback(
        `Weatherstack API is not available: ${error.message}`,
        undefined,
      );
    } else if (response.body.error) {
      callback(
        `Weatherstack API error: ${response.body.error.type}`,
        undefined,
      );
    } else {
      callback(undefined, response);
    }
  });
};
