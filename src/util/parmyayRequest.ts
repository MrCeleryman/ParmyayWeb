import { Review } from "API";

export class Request {
	public static makeReview(payload: Review) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}