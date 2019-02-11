import { Option } from '../model/option';

export module Constants {

    export class RiscTypes {
        public static RISC_TYPES: Array<Option<string>> = [
            new Option<string>('', 'Selecione'),
            new Option<string>('A', 'A'),
            new Option<string>('B', 'B'),
            new Option<string>('C', 'C'),
        ]
    }

}