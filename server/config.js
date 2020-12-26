const CONF = {
    serverHost: 'localhost',
    tunnelServerUrl: 'http://tunnel.ws.qcloud.la',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1259637246',
    qcloudSecretId: 'AKIDb1A36tcpvnRs2FiH8i6FCtKWZOzeccDl',
    qcloudSecretKey: 'Un13tBF5lHchcmpgZnqKkx4lDPyy1uYT',
    wxMessageToken: 'weixinmsgtoken',

    networkTimeout: 30000,


    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxaa695e036754f496',

    // 微信小程序 App Secret
    appSecret: '89f6cec2e01dc674b38f626afdc1d855',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '192.168.50.95',
        port: 3308,
        user: 'root',
        db: 'cAuth',
        pass: '216966',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
