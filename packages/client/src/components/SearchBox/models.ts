export interface Hotel {
    _id: string;
    hotel_name: string;
    chain_name: string;
    addressline1: string;
    addressline2: string;
    zipcode: string;
    city: string;
    state: string;
    country: string;
    countryisocode: string;
    star_rating: number;
}

export interface Country {
    _id: string;
    country: string;
    countryisocode: string;
}

export interface City {
    _id: string;
    name: string;
}

export interface SearchData {
    hotels: Hotel[];
    countries: Country[];
    cities: City[];
}

