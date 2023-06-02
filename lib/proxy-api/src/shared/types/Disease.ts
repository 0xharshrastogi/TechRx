export type Doctor = string;

export class Disease {
	public readonly name: string;

	public readonly doctors: Doctor[] = [];

	constructor(name: string) {
		this.name = name;
	}

	addDoctor(...doctors: Doctor[]): void {
		this.doctors.push(...doctors);
	}
}
