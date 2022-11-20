module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['ubuntu'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
  ],
};
