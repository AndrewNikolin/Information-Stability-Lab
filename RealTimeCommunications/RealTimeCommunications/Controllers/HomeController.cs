using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeCommunications.Hubs;

namespace RealTimeCommunications.Controllers
{
    public class HomeController : Controller
    {
        private IHubContext<CommunicationHub> hubContext;

        public HomeController(IHubContext<CommunicationHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        public string SendMessageToClient(string message)
        {
            this.hubContext.Clients.All.InvokeAsync("ServerMessage", message);
            return $"Message '{message}' was sent to all clients";
        }
    }
}
