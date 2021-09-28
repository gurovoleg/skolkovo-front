const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  // в env можно добавлять любые параметры, которые будем получать в module.exports и использовать для подготовки сборки
  const mode = (env && env.mode) || 'development'

  // Функция задания плагинов для production / development
  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Сколково',
        template: 'src/index.html'
      })
    ]
    if (mode === 'production') {
      plugins.push(new MiniCssExtractPlugin({
        filename: 'css/[name]-[hash:8].css'
      })
      )
    }
    return plugins
  }

  return {
    mode,
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: mode === 'production' ? 'js/main-[contenthash:8].js' : 'js/main.js',
      publicPath: '/'
    },
    devtool: mode === 'production' ? 'none' : 'source-map',
    // веб-сервер для разработки
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/',
      historyApiFallback: true,
      open: true // автоматически открывать страницу входа
    },

    resolve: {
      alias: {
        Root: path.resolve(__dirname, 'src/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Containers: path.resolve(__dirname, 'src/containers/'),
        Pages: path.resolve(__dirname, 'src/pages/'),
        Utils: path.resolve(__dirname, 'src/utils/'),
        Reducers: path.resolve(__dirname, 'src/reducers/'),
        Sagas: path.resolve(__dirname, 'src/sagas/'),
        Selectors: path.resolve(__dirname, 'src/selectors/'),
        Data: path.resolve(__dirname, 'src/data/'),
        Services: path.resolve(__dirname, 'src/services/')
      }
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg|ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: mode === 'production' ? '[name].[ext]' : '[name]-[sha1:hash:7].[ext]',
              outputPath: 'images'
            }}]
        },
        // fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }]
        },
        // styles css
        {
          test: /\.(css)$/,
          use: [
            { loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                import: true
              }
            }
          ]
        },
        // styles scss/sass
        {
          test: /\.(s[ac]ss)$/,
          use: [
            // Creates `style` nodes from JS strings
            { loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
            // Translates CSS into CommonJS
            { loader: 'css-loader' },
            // Compiles Sass to CSS
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: getPlugins()
  }
}
