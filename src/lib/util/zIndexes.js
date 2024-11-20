// zIndexes.js

const makeZIndexes = (layers) =>
  layers.reduce((agg, layerName, index) => {
    const valueName = `z-index-${layerName}`;
    agg[valueName] = index * 100;

    return agg;
  }, {});

const createStyleString = (layers) => {
  const zIndexes = makeZIndexes(layers);
  return Object.entries(zIndexes)
    .map(([name, value]) => `--${name}: ${value}; `)
    .join('');
};

const injectStyleString = (browser, layers) => {
  if (browser) {
    const styleString = createStyleString(layers);
    document.querySelector('#app').setAttribute('style', styleString);
  }
};

export { injectStyleString };

