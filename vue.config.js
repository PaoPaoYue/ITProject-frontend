const path = require( 'path' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  "transpileDependencies": [
    "vuetify",
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  ],
  parallel: false,
  devServer: {
    port: 5110,
    proxy: {
      '/api': {
        target: 'http://49.234.113.197:5100/',
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        externals: {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'vuex': 'Vuex',
          'axios': 'axios',
          'vue-meta': 'VueMeta',
          'highlight.js': 'hljs',
        },
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
          }),
          new CKEditorWebpackPlugin({
            language: 'en',
            translationsOutputFile: /app/
          })
        ]
      }
    } else {
      return {
        plugins: [
          new CKEditorWebpackPlugin({
            language: 'en',
            translationsOutputFile: /app/
          })
        ]
      }
    }
    
  },
  chainWebpack: config => {
    const svgRule = config.module.rule( 'svg' );
    svgRule.exclude.add( path.join( __dirname, 'node_modules', '@ckeditor' ) );
    config.module
        .rule( 'cke-svg' )
        .test( /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/ )
        .use( 'raw-loader' )
        .loader( 'raw-loader' );
    config.module
        .rule( 'cke-css' )
        .test( /ckeditor5-[^/\\]+[/\\].+\.css$/ )
        .use( 'postcss-loader' )
        .loader( 'postcss-loader' )
        .tap( () => {
            return styles.getPostCssConfig( {
                themeImporter: {
                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
                },
                minify: true
            } );
        } );
    config.plugin('html')
      .tap( args => {
        args[0].isProduction = isProduction;
        return args;
      } )
  }
}