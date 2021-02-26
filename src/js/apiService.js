const keyApi = '20390864-d4afb1d39cdd190c7156392aa';
export default {
    searchQuery: '',
    page: 1,


    receiveData() {
        const urlApi = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${keyApi}`;
        const options = {
            headers: {
                Authorization: keyApi,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:4040/',
                // 'Access-Control-Allow-Methods': GET,
                // 'Access-Control-Allow-Headers': Content - Type,
                // Authorization,
            }
        };

        return fetch(urlApi, options)
            .then(res => res.json())
            .then(({ data }) => {
                this.incrementPage();
                return data;
            });
    },
    resetPage() {
        this.page = 1;
    },
    incrementPage() {
        this.page += 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
};