import { describe, test, expect } from "vitest";
import {
  coordinatesInfoPromises,
  weatherInfoPromises,
} from "../src/asyncFunctionsPromises.js";

describe("Asynchronous function coordinatesInfoPromises", () => {
  test("coordinatesInfoPromises should get coordinates information", () => {
    return coordinatesInfoPromises("Tenerife, Spain").then((data) => {
      expect(data.body.features[0].geometry.coordinates).to.be.eql([
        -13.670858, 28.920507,
      ]);
    });
  });

  test("coordinatesInfoPromises should provide an error", () => {
    return coordinatesInfoPromises("12wherever").catch((err) => {
      expect(err).to.be.equal("Mapbox API error: no location found");
    });
  });
});

/*describe("Asynchronous function weatherInfoPromises tests", () => {
  test("weatherInfoPromises should get weather information", () => {
    return weatherInfoPromises("Tenerife, Spain").then((data) => {
      expect(data.body.location.name).to.be.equal("Tenerife");
    });
  });

  test("weatherInfoPromises should provide an error", () => {
    return weatherInfoPromises("12wherever").catch((err) => {
      expect(err).to.be.equal("request_failed");
    });
  });
});*/
