export class Option<T> {
    label: string;
    value: T;

    constructor(value: T, label: string) {
        this.value = value;
        this.label = label;
    }
}