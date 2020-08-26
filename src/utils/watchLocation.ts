export const watchLocation = async (
  cb: (location: Position) => any,
  options?: PositionOptions,
) => {
  window.navigator.geolocation.watchPosition(cb, console.error, {
    enableHighAccuracy: true,
    ...options,
  });
};
