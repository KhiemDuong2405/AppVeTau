import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
})
export class AddTripComponent implements OnInit {
  constructor(private http: HttpClient) {}

  isCreating = false;
  today: string = '';
  selectedDate: string = '';
  routes: string[] = [
    'Bạch Đằng',
    'Thủ Thiêm',
    'Bình An',
    'Thanh Đa',
    'Hiệp Bình Chánh',
    'Linh Đông',
  ];

  gioTuyenDi: string[][] = [
    ['08:30', '08:40', '08:55', '09:15', '09:30', '09:45'],
    ['09:45', '09:55', '10:10', '10:30', '10:45', '11:00'],
    ['11:00', '11:10', '11:25', '11:45', '12:00', '12:15'],
    ['12:15', '12:25', '12:40', '13:00', '13:15', '13:30'],
    ['13:30', '13:40', '13:55', '14:15', '14:30', '14:45'],
    ['14:45', '14:55', '15:10', '15:30', '15:45', '16:00'],
    ['16:00', '16:10', '16:25', '16:45', '17:00', '17:15'],
    ['17:15', '17:25', '17:40', '18:00', '18:15', '18:30'],
    ['18:30', '18:40', '18:55', '19:15', '19:30', '19:45'],
    ['19:45', '19:55', '20:10', '20:30', '20:45', '21:00'],
  ];

  gioTuyenVe: string[][] = [
    ['09:45', '10:00', '10:15', '10:35', '10:50', '10:55'],
    ['11:00', '11:10', '11:30', '11:50', '12:05', '12:10'],
    ['12:15', '12:30', '12:45', '13:05', '13:20', '13:25'],
    ['13:30', '13:45', '14:00', '14:20', '14:35', '14:40'],
    ['14:45', '15:00', '15:15', '15:35', '15:50', '15:55'],
    ['16:00', '16:15', '16:30', '16:50', '17:05', '17:10'],
    ['17:15', '17:30', '17:45', '18:05', '18:20', '18:25'],
    ['18:30', '18:45', '19:00', '19:20', '19:35', '19:40'],
    ['19:45', '20:00', '20:15', '20:35', '20:50', '20:55'],
    ['21:00', '21:15', '21:30', '21:50', '22:05', '22:10'],
  ];

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
  }

  onAddTrip() {
    this.isCreating = true;
    const formattedDate = this.selectedDate.split('-').reverse().join('');
    const trips = [];

    for (let i = 0; i < this.gioTuyenDi.length; i++) {
      for (let j = 0; j < this.routes.length - 1; j++) {
        for (let k = j + 1; k < this.routes.length; k++) {
          const from = this.routes[j];
          const to = this.routes[k];
          const [giodi, phutdi] = this.gioTuyenDi[i][j].split(':').map(Number);
          const [gioden, phutden] = this.gioTuyenDi[i][k]
            .split(':')
            .map(Number);

          trips.push({
            date: formattedDate,
            from,
            to,
            index: i + 1,
            giodi,
            phutdi,
            gioden,
            phutden,
          });
        }
      }

      for (let j = this.routes.length - 1; j > 0; j--) {
        for (let k = j - 1; k >= 0; k--) {
          const from = this.routes[j];
          const to = this.routes[k];
          const [giodi, phutdi] = this.gioTuyenVe[i][this.routes.length - 1 - j]
            .split(':')
            .map(Number);
          const [gioden, phutden] = this.gioTuyenVe[i][
            this.routes.length - 1 - k
          ]
            .split(':')
            .map(Number);

          trips.push({
            date: formattedDate,
            from,
            to,
            index: i + 1,
            giodi,
            phutdi,
            gioden,
            phutden,
          });
        }
      }
    }

    let completed = 0;

    trips.forEach((trip) => {
      this.http.post('http://localhost:8080/api/trip', trip).subscribe({
        next: () => {
          completed++;
          if (completed === trips.length) {
            this.isCreating = false;
            alert('Tạo tất cả chuyến thành công!');
          }
        },
        error: () => {
          this.isCreating = false;
          alert('Có lỗi xảy ra khi tạo chuyến.');
        },
      });
    });
  }
}
