export type AllowedLocalisations = "parma" | "parmi" | "parmy";

export class LocalisedStrings {
	private static localisation: AllowedLocalisations = "parma";

	private static subscribers = [];
	private static LANG = {
		"parma": {
			// Add whatever localisations strings in here.
			"parma": "parma"
		},
		"parmi": {
			"parma": "parmi"
		},
		"parmy": {
			"parma": "parmy"
		}
	}

	public static currentLocalisation = Object.assign({}, LocalisedStrings.LANG[LocalisedStrings.localisation]);

	public static subscribe(cb: Function) {
		this.subscribers.push(cb);
	}

	public static getLocalisations = () => {
		return Object.keys(LocalisedStrings.LANG);
	}
	public static getCurrentLocalisation = () => {
		return LocalisedStrings.localisation;
	}

	public static setLocalisation = (newLocalisation: AllowedLocalisations) => {
		LocalisedStrings.localisation = newLocalisation;

		// Make a copy of the static localisation translations, and assign them key-by-key to allow VueJS to detect changes.
		const langCopy = Object.assign({}, LocalisedStrings.LANG[newLocalisation]);
		for (let i in langCopy) {
			LocalisedStrings.currentLocalisation[i] = langCopy[i];
		}
		
		LocalisedStrings.subscribers.forEach(x => x(newLocalisation));
	}
}
