import axios from 'axios';

export default class Anticipated {
    constructor() {
        this.test = 'this is a test';
    }
   
    async getGames(){
        const clientID = process.env.CLIENT;
        const auth = process.env.AUTH;
        const proxy = process.env.PROXY;
        try {
            const res = await axios({
                url: `${proxy}/https://api.igdb.com/v4/games/`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': `${clientID}`,
                    'Authorization': `Bearer ${auth}`,
                },
                data: `fields name, cover.url, hypes, first_release_date; where hypes != n & first_release_date > 1605867406; sort hypes desc; limit 5;`

            });

            this.result = res.data;
            // console.log(this.result);
        }
        catch (error) {
            console.log(`There was an error in Anticipated.js file: ${error}`);
        }
    }
}

