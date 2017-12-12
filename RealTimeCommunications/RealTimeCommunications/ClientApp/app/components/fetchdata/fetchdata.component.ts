import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { HubConnection } from "@aspnet/signalr-client/dist/src";

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public newForecast: WeatherForecast;
    private notificationsHub: HubConnection;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));
        this.newForecast = new WeatherForecast();

        this.notificationsHub = new HubConnection("/CommunicationHub");

        //this.notificationsHub.on("Forecast", (forecast: WeatherForecast) => {
        //    this.forecasts.push(forecast);
        //});

        this.notificationsHub.start();
    }

    public sendForecast() {
        //this.notificationsHub.invoke("SendForecast", this.newForecast);
        this.newForecast = new WeatherForecast();
    }
}

class WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
