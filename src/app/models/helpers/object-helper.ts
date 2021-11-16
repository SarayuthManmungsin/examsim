export class ObjectHelper {

    static copy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    static copyProperties(source: any, destination: any) {
        for (const prop in source) {
            if (typeof source[prop] !== 'function') {
                destination[prop] = source[prop];
            }
        }
    }

    static toCamel(data: object | any[]) {
        if (!data) return data;
        if (data instanceof Array) {
            return this.arrayToCamel(data);
        }
        return this.objectToCamel(data);
    }

    private static arrayToCamel(data: any[]) {
        let result = [];
        for (const origKey of Object.keys(data)) {
            let value = data[origKey];
            if (typeof value === 'object') {
                value = this.toCamel(value);
            } else if (value instanceof Array) {
                value = this.toCamel(value);
            }
            result.push(value);
        }
        return result;
    }

    private static objectToCamel(data: object) {
        let result = {};
        for (const origKey of Object.keys(data)) {
            if (!data.hasOwnProperty(origKey)) continue;
            let newKey = this.toLowerCamelCase(origKey);
            let value = data[origKey];
            if (typeof value === 'object') {
                value = this.objectToCamel(value);
            } else if (value instanceof Array) {
                value = this.arrayToCamel(value);
            }
            result[newKey] = value;
        }
        return result;
    }

    private static toLowerCamelCase(text: string) {
        return (text.charAt(0).toLowerCase() + text.slice(1) || text);
    }

    static toCapitalize(data: any) {
        let result, newKey, value;
        if (data instanceof Array) {
            result = [];
            for (const origKey of Object.keys(data)) {
                value = data[origKey];
                if (typeof value === 'object') {
                    value = this.toCapitalize(value);
                } else if (value instanceof Array) {
                    value = this.toCapitalize(value);
                }
                result.push(value);
            }
        } else {
            result = {};
            for (const origKey of Object.keys(data)) {
                if (data.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString();
                    value = data[origKey];
                    if (value !== null && value !== undefined && value.constructor === Object) {
                        value = this.toCapitalize(value);
                    } else if (value !== null && value !== undefined && value.constructor === Array) {
                        value = this.toCapitalize(value);
                    }
                    result[newKey] = value;
                }
            }
        }
        return result;
    }

    static joinArrayToNumberList(arrs: Array<any>, prop: string) {
        const results = [];
        for (let i = 0; i < arrs.length; i++) {
            const item = parseInt(arrs[i][prop], 10);
            if (item && !isNaN(item)) {
                results.push(item);
            }
        }
        return results;
    }
}
