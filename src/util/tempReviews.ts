import { Review, User, Venue } from "API";

export class TempReviews {
    public static getTempReviews(): Review[] {
        let U1: User = {
			id: 0,
			userName: "MrParm",
			password: null,
			email: null,
			firstName: null,
			lastName: null,
			created: new Date(1490581405),
			updated: new Date(1490581405),
			deleted: null,
			reviews: null
		};
		let U2: User = Object.assign({}, U1, { id: 1, userName: "Parminator"});
		let U3: User = Object.assign({}, U1, { id: 2, userName: "PassTheParmy"});

		let V1: Venue = {
			id: 0,
			venueName: "RE",
			address: "10 High St, Toowong QLD 4066",
			latitude: -27.486144,
			longitude: 152.9917123,
			created: new Date(1490581405),
			updated: new Date(1490581405),
			deleted: null,
			reviews: null
		};
		let V2: Venue = Object.assign({}, V1, { id: 1, venueName: "Red Room"});
		let V3: Venue = Object.assign({}, V1, { id: 2, venueName: "Grand Central"});
		let V4: Venue = Object.assign({}, V1, { id: 3, venueName: "Flying Cock"});
		
        let reviews = [{
			id: 0,
			userId: 0,
			user: U1,
			venueId: 0,
			venue: V1,
			rating: 1,
			notes: "Was not a parmy.",
			image: "//images.foodmento.com/U2303P7776F30440-1434084327-f2c.jpg",
			created: new Date(1490581405),
			updated: new Date(1490581405),
			deleted: null
		}, {
			id: 1,
			userId: 0,
			user: U1,
			venueId: 1,
			venue: V2,
			rating: 1,
			notes: "Served soggy chicken on top of chips. Next to no effort put into preparation.",
			image: "//truffle-assets.imgix.net/pxqrocxwsjcc_1tJ6fX5PFmKcMKgyoUqMWI_chicken-parmigiana_squareThumbnail_en.png?w=960&fl=progressive&fm=jpg",
			created: new Date(1490581405),
			updated: new Date(1490581405),
			deleted: null
		}, {
			id: 0,
			userId: 0,
			user: U2,
			venueId: 0,
			venue: V3,
			rating: 5,
			notes: "Beautiful moist chicken, perfect amount of sauce. 10/10",
			image: "//images.media-allrecipes.com/userphotos/960x960/3757209.jpg",
			created: new Date(1490581405),
			updated: new Date(1490581405),
			deleted: null
		}, {
			id: 0,
			userId: 0,
			user: U3,
			venueId: 0,
			venue: V4,
			rating: 4,
			notes: "Excellent value, 2 for $10 and you cannot go wrong.",
			image: "//fthmb.tqn.com/9XjTwKEGGLwbIXQgj6hiVN_hkZ0=/960x0/filters:no_upscale()/about/blpoul94-56a496bf5f9b58b7d0d7b505.jpg",
			created: new Date(1490581405),
			updated: new Date(1490581405),
			deleted: null
		}];

        return reviews;
    }
}
