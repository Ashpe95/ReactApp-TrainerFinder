const sports = [
    {
        "_id":"Tenis",
        "name":"Tenis",
        "description":[]
    },
    {
        "_id":"Narciarstwo",
        "name":"Narciarstwo",
        "description":[]
    },
    {
        "_id":"Rolki",
        "name":"Rolki",
        "description":[]
    },
    {
        "_id":"Strzelectwo",
        "name":"Strzelectwo",
        "description":[]
    },
    {
        "_id":"Jeździectwo",
        "name":"Jeździectwo",
        "description":[]
    },
    {
        "_id":"Fitness",
        "name":"Fitness",
        "description":[]
    },
    {
        "_id":"Bilard",
        "name":"Bilard",
        "description":[]
    },
    {
        "_id":"Inne",
        "name":"Inne",
        "description":[]
    }
]

const price = [
    {
        "_id":0,
        "name":"Dowolna",
        "array":[]
    },
    {
        "_id":1,
        "name":"0 - 29 zł",
        "array":[0,29]
    },
    {
        "_id":2,
        "name":"30 - 49 zł",
        "array":[30,49]
    },
    {
        "_id":3,
        "name":"50 - 69 zł",
        "array":[50,69]
    },
    {
        "_id":4,
        "name":"70 - 99 zł",
        "array":[70,99]
    },
    {
        "_id":5,
        "name":"powyżej 99 zł",
        "array":[99,15000000000]

    }
]

const WEEKDAYS = ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So'];
const MONTHS = [ 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];


export {
    sports,
    price,
    WEEKDAYS,
    MONTHS
}