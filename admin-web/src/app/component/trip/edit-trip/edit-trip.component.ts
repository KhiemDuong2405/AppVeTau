import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.scss',
})
export class EditTripComponent implements OnInit {
  constructor(private http: HttpClient) {}

  isDeleting = false;
  today: string = '';
  selectedDate: string = '';
  departure: string = '';
  destination: string = '';
  trainCode: number | null = null;

  locations: string[] = [
    'Bạch Đằng',
    'Thủ Thiêm',
    'Bình An',
    'Thanh Đa',
    'Hiệp Bình Chánh',
    'Linh Đông',
  ];

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
  }

  onDeleteTrip() {
    const params: any = {};

    if (this.selectedDate) {
      params.date = this.selectedDate.split('-').reverse().join('');
    }
    if (this.departure) {
      params.from = this.departure;
    }
    if (this.destination) {
      params.to = this.destination;
    }
    if (this.trainCode) {
      params.index = this.trainCode;
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `http://localhost:8080/api/trip?${queryString}`;

    this.isDeleting = true;

    this.http.delete(url).subscribe({
      next: () => {
        this.isDeleting = false;
        alert('Deleted successfully');
      },
      error: (err) => {
        this.isDeleting = false;
        alert('Delete failed: ' + err.message);
      },
    });
  }
}
