export const getLocation = (options?: PositionOptions) =>
  new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          accuracy: position.coords.accuracy,
        });
      },
      () => {
        reject('no position access');
      },
      options,
    );
  });
