namespace PantryBackEnd.Controllers
{

    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public  int Get()
        {
            
            return 0;
        }
    }
}