const BaseProvider = require('./BaseProvider');

class KaKaoProvider extends BaseProvider {

    constructor() {
        super();
    }

    async getClient_id(accessToken) {
        this.setInstance('https://kapi.kakao.com', {
            Authorization: `Bearer ${accessToken}`,
        });
        const response = await this.getInstance()?.get(
            '/v1/user/access_token_info',
        );
        return response?.data.id;
    }

}

module.exports = KaKaoProvider;
