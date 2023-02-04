module.exports = {
    /*
     ** Headers of the page
     */
    // mode:"spa",
    head: {
        title: '房屋租赁平台',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '{{escape description }}' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }

        ]
    },
    // , '~/plugins/vue-map.js'
    plugins: ['~/plugins/element-ui', {
        src: '~/plugins/nuxt-swiper-plugin.js',
        ssr: false
    }, { src: '~/plugins/baidu-map.js', ssr: false }],
    css: ['element-ui/lib/theme-chalk/index.css', 'swiper/dist/css/swiper.css'],
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */
    buildModules: [
        '@nuxtjs/style-resources',
        '@nuxt/postcss8',
    ],
    build: {
        vendor: ['element-ui'],
        /*
         ** Run ESLint on save
         */
        postcss: {
            plugins: {},
            preset: {}
        },
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}