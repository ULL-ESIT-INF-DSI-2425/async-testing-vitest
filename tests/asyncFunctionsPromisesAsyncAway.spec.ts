import { describe, test, expect } from "vitest";
import {
  coordinatesInfoPromises,
  weatherInfoPromises,
} from "../src/asyncFunctionsPromises.js";

describe("Asynchronous function coordinatesInfoPromises", () => {
  test("coordinatesInfoPromises should get coordinates information (using async/await)", async () => {
    const data = await coordinatesInfoPromises("Tenerife, Spain");
    expect(data.body.features[0].geometry.coordinates).to.be.eql([
      -13.670858, 28.920507,
    ]);
  });

  test("coordinatesInfoPromises should provide an error (using async/await)", async () => {
    try {
      await coordinatesInfoPromises("12wherever");
    } catch (err) {
      expect(err).to.be.equal("Mapbox API error: no location found");
    }
  });
});

/*describe("Asynchronous function weatherInfoPromises tests", () => {
  test("weatherInfoPromises should get weather information (using async/await)", async () => {
    const data = await weatherInfoPromises("Tenerife, Spain");
    expect(data.body.location.name).to.be.equal("Tenerife");
  });

  test("weatherInfoPromises should provide an error (using async/await)", async () => {
    try {
      await weatherInfoPromises("12wherever");
    } catch (err) {
      expect(err).to.be.equal("request_failed");
    }
  });
});*/
