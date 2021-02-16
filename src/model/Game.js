import axios from 'axios';

export default class Game {
    constructor(id) {
        this.id = id;
    }

    async getGame() {
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
                data: `fields name, cover.url, summary, involved_companies.developer, involved_companies.company.name, involved_companies.company.logo.url, involved_companies.company.logo.image_id, involved_companies.company.websites.url; where id = ${this.id};`
            });
            this.title = res.data[0].name;
            this.summary = res.data[0].summary;
            this.cover = res.data[0].cover.url;

            let theCompany;
            const companies = res.data[0].involved_companies;
            companies.forEach( com => {
                if (com.developer === true) {
                    // console.log('true case');
                    return theCompany = com;
                }
            });
            // console.log(theCompany);
            this.company = theCompany.company.name;
            this.logo = theCompany.company.logo.image_id;
            if (theCompany.company.websites) {
                this.website = theCompany.company.websites[0].url;
            } else {
                console.log('The company website link not found');
            }
            
            
        }
        catch (error) {
            console.log(`Error found in Game.js`);
            console.log(error);
            // console.log(this.id);
        }
    }
}

