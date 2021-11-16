export class StringHelper {

    static capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static joinArray(arrs: Array<any>, prop: string, separater: string) {
        return arrs.map(elem => {
            if (prop) {
                return elem[prop];
            } else {
                return elem;
            }
        }).join(separater);
    }

    static replaceAll(text: string, search: string, replace: string) {
        return text.split(search).join(replace);
    }

    static replaceSpecialChars(str: string): string {
        const chars = '[&\/\\#,+()$~%.\'":*?<>]@^|!_';
        for (let i = 0; i < chars.length; i++) {
            str = StringHelper.replaceAll(str, chars[i], '');
        }
        return str;
    }

    static randomString(): string {
        const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    }

    static format(format: string, values: Array<any>): string {
        let result = format;
        for (let i = 0; i < values.length; i++) {
            result = StringHelper.replaceAll(result, '{' + i + '}', values[i]);
        }
        return result;
    }

    static getEnglishAlphabets(): Array<string>  {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }

    static getEnglishAlphabetsWithZeroToNine(): Array<string> {
        const chars = StringHelper.getEnglishAlphabets();
        chars.push('0-9');
        return chars;
    }

    static replaceCharAt(str: string, index: number, newChar: string): string {
        return str.substr(0, index) + newChar + str.substr(index + newChar.length);
    }
}
