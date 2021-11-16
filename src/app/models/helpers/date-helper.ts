export class DateHelper {

    static fullMonths: Array<string> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    static shortMonths: Array<string> = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    static fullDays: Array<string> = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Satuarday'
    ];

    static addMonths(currentDate: Date, months: number): Date {
        if (months === 0) {
            return currentDate;
        }
        const date = new Date(currentDate.valueOf());
        date.setMonth(date.getMonth() + months);
        return date;
    }

    static addYears(currentDate: Date, years: number): Date {
        if (years === 0) {
            return currentDate;
        }
        const date = new Date(currentDate.valueOf());
        date.setFullYear(date.getFullYear() + years);
        return date;
    }

    static addDays(currentDate: Date, days: number): Date {
        if (days === 0) {
            return currentDate;
        }
        const date = new Date(currentDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    static addHours(currentDate: Date, hours: number): Date {
        if (hours === 0) {
            return currentDate;
        }
        const date = new Date(currentDate.valueOf());
        date.setTime(currentDate.getTime() + (hours * 60 * 60 * 1000));
        return date;
    }

    static addMinutes(currentDate: Date, minutes: number): Date {
        if (minutes === 0) {
            return currentDate;
        }
        const date = new Date(currentDate.valueOf());
        date.setTime(currentDate.getTime() + (minutes * 60 * 1000));
        return date;
    }

    static addSeconds(currentDate: Date, seconds: number): Date {
        if (seconds === 0) {
            return currentDate;
        }
        const date = new Date(currentDate.valueOf());
        date.setTime(currentDate.getTime() + (seconds * 1000));
        return date;
    }

    static dateWithoutTime(date: Date) {
        return new Date(date.setHours(0, 0, 0, 0));
    }

    static format(format: string, date): string {
        const dateString = format
            .replace('yyyy', date.getFullYear() + '')
            .replace('mm', (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) + '')
            .replace('dd', date.getDate() <= 9 ? '0' + date.getDate() : date.getDate() + '');
        return dateString;
    }

    static getMonthIndexByShortName(shortName: string): number {
        return this.shortMonths.indexOf(shortName);
    }

    static isDate(obj: any): boolean {
        if (obj.getMonth) {
            return true;
        }
        return false;
    }

    static convertDatesSubmitFormat(dates: Array<Date>): Array<string> {
        const datesString = [];
        for (let i = 0; i < dates.length; i++) {
            datesString.push(DateHelper.convertDateSubmitFormat(dates[i]));
        }
        return datesString;
    }

    static convertDateSubmitFormat(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        const day = date.getDate() > 9 ? date.getDate() + '' : '0' + date.getDate();

        return year + '/' + month + '/' + day;
    }

    static toSubmitURLFormat(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        const day = date.getDate() > 9 ? date.getDate() + '' : '0' + date.getDate();

        return year + '-' + month + '-' + day;
    }

    static differentInDays(date1: Date, date2: Date) {
        return (date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24);
    }
}
