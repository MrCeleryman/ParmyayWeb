declare module "API" {
    export interface User {
        id: number,
        userName: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string,
        created: Date,
        updated: Date,
        deleted: Date,
        reviews: Review[]
    }

    export interface Venue {
        id: number,
        venueName: string,
        address: string,
        latitude: number,
        longitude: number,
        created: Date,
        updated: Date,
        deleted: Date,
        reviews: Review[]
    }

    export interface Review {
        id: number,
        userId: number,
        user: User,
        venueId: number,
        venue: Venue,
        rating: number,
        notes: string,
        image: string,
        created: Date,
        updated: Date,
        deleted: Date
    }
}