module.exports = function (api) {
  api.cache(true);
  console.log('hello from babel');
  babelrcRoots: [
  ".",
  ],
  
  const presets = [ ["env" , { "targets": { "chrome": 75, 
                                 
                                  "browsers": ["last 2 Chrome versions", "last 2 versions"]
                                }
                             }
                           ]],
  "ignore" : [
          "/home/gnock/imba/my-webpack-app/node_modules/websocket/lib/browser.js"
  ],
  ];
  const plugins = [
                   ["@babel/transform-runtime", {
                    corejs: 3,
                    }], ["@babel/plugin-transform-spread"],
                   ["babel-plugin-transform-remove-strict-mode"],
                   ["@babel/plugin-transform-modules-commonjs"]
                  ];

  return {
    presets,
    plugins
  };
}
