export class MealService {

    getHeaders = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getMeals = () => {
        return fetch('http://localhost:8010/meals', {
            method: 'GET',
            headers: this.getHeaders()
        }).then(response => {
            if(response.status !== 200){
                return [];
            }
            return response.json().then(data => {
                return data;
            });
        });
    }

    sendMeal = (meal) => {
       return fetch('http://localhost:8010/meals', {
            method: 'post',
            headers: this.getHeaders(),
            body: JSON.stringify(meal)
        }).then(response => {
            return response;
        });
    }
}