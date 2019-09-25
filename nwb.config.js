module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SedaSearch',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    presets: [
      ["env", {
        "targets": {
          "browsers": [
            "Chrome >= 52",
            "FireFox >= 44",
            "Safari >= 7",
            "Explorer 11",
            "last 4 Edge versions"
          ]
        }
      }],
      "es2015", "react", "stage-0"
    ],
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    }
  }
}
