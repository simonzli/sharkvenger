export const getLocation = (options?: PositionOptions) =>
  new Promise<Position>((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      () => {
        reject('no position access');
      },
      {
        enableHighAccuracy: true,
        ...options,
      },
    );
  });
