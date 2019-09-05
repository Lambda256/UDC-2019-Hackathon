function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: '#CACACA',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}

export {elevationShadowStyle};
