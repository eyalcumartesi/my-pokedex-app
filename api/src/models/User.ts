import { v4 as uuidv4 } from "uuid";

export class User {
	id: string;
	username: string;
	password: string;
	favorites: string[];

	constructor(username: string, password: string) {
		this.id = uuidv4();
		this.username = username;
		this.password = password;
		this.favorites = [];
	}
}
