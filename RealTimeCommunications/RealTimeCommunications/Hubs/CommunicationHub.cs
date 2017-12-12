using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using RealTimeCommunications.Controllers;

namespace RealTimeCommunications.Hubs
{
    public class CommunicationHub : Hub
    {
        public void SendMessageServer(int count)
        {
            Debug.WriteLine($"Message #{count} recieved");
        }

        public Task ChatMessage(string message)
        {
            return Clients.All.InvokeAsync("ChatMessage", message);
        }

        public Task SendForecast(SampleDataController.WeatherForecast forecastData)
        {
            return Clients.All.InvokeAsync("Forecast", forecastData);
        }
    }
}
