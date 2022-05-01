import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({ providedIn: 'root' })
export class Database implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      salesData: [
        {
          id: "electronic",
          name: 'Elektronik',
          bestSellers: [
            {
              name: 'iPhone',
              count: 1561,
              unitPrice: 999,
              total: 1559439
            },
            {
              name: 'iPad Air',
              count: 1462,
              unitPrice: 599,
              total: 875738
            },
            {
              name: 'MacBook Air',
              count: 996,
              unitPrice: 899,
              total: 895404
            },
            {
              name: 'AirPods',
              count: 856,
              unitPrice: 999,
              total: 153224
            },
          ]
        },
        {
          id: "book",
          name: 'Kitap',
          bestSellers: [
            {
              name: 'Atomic Habits',
              count: 2563,
              unitPrice: 11.79,
              total: 30217.77
            },
            {
              name: 'Atlas of the Heart',
              count: 1896,
              unitPrice: 15.33,
              total: 29065.68
            },
            {
              name: 'This Will Not Pass',
              count: 1523,
              unitPrice: 14.99,
              total: 22829.77
            },
            {
              name: 'Finding Me',
              count: 1023,
              unitPrice: 17.69,
              total: 18096.87
            },
          ]
        },
      ]
    };
  }
}
