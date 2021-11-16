import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class PersistanceService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing to localStorage', e);
    }
  }

  clearExcept(exceptKey: string): void {
    try {
      const exceptObject = localStorage.getItem(exceptKey);
      const storageKey = localStorage.clear();
      localStorage.setItem(exceptKey, exceptObject);
    } catch (e) {
      console.error('Error clearing on localStorage', e);
    }
  }

  get<T>(key: string): T {
    try {
      return JSON.parse(localStorage.getItem(key)) as T;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
}