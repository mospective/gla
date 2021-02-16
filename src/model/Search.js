import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async searchGames() {
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
                // data: `fields name, involved_companies, cover.url; search "${this.query}"; where version_parent = null;`
                data: `fields name,genres,platforms,involved_companies,cover.url, cover.height; search "${this.query}"; limit 50; where version_parent = null;`
    
            });
            this.searchResult = res.data;
            // console.log(this.searchResult);
        }
        catch (error){
            console.log(`There was an error in Search.js file: ${error}`);
        }
        
    }
}

// const Test = new Search('Assassin\'s creed');
// Test.searchGames();