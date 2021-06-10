import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<{dateString: string; temp: number}[]>;

  constructor(private forecastService: ForecastService) {
    this.forecast$ = forecastService.getForecast();
  }

  ngOnInit(): void {
  }

}
