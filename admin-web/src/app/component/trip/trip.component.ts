import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Trip {
  date: string;
  from: string;
  to: string;
  index: number;
}

@Component({
  selector: 'app-trip',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss',
})
export class TripComponent {
  constructor(private http: HttpClient) {}

  selectedDate: string = '';
  trips: Trip[] = [];

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.selectedDate = today;
    this.onShowTrip();
  }

  onShowTrip() {
    if (!this.selectedDate) {
      this.trips = [];
      return;
    }

    const dateParam = this.selectedDate.split('-').reverse().join('');
    const url = `http://localhost:8080/api/trip?date=${dateParam}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        const result: Trip[] = [];

        for (const from in data) {
          for (const to in data[from]) {
            for (const index in data[from][to]) {
              result.push({
                date: dateParam,
                from,
                to,
                index: +index,
                ...data[from][to][index],
              });
            }
          }
        }
        this.trips = result;
      },
      error: (err) => {
        console.error('Failed to fetch trips', err);
        this.trips = [];
      },
    });
  }

  formatDate(raw: string): string {
    if (!raw || raw.length !== 8) return raw;
    const day = raw.slice(0, 2);
    const month = raw.slice(2, 4);
    const year = raw.slice(4);
    return `${day}/${month}/${year}`;
  }
}
