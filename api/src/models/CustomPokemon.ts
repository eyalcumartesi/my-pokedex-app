import { v4 as uuidv4 } from "uuid";

export class CustomPokemon {
	id: string;
	name: string;
	height: number;
	weight: number;
	userId: string;

	constructor(name: string, height: number, weight: number, userId: string) {
		this.id = uuidv4();
		this.name = name;
		this.height = height;
		this.weight = weight;
		this.userId = userId;
	}
}
