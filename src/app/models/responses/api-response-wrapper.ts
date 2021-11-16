import { Meta } from './meta';

export interface APIResponseWrapper<T = any> {

    data: T;

    errors: Array<string>;

    meta: Meta;

    examTitle: string;
}
