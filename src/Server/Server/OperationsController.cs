using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Server
{
    [ApiController]
    public class OperationsController : Controller
    {
        [HttpGet]
        [Route("Read")]
        public IActionResult Read()
        {
            return new JsonResult(new ServerDbContext().Product.ToList());
        }
        
        [HttpGet]
        [Route("Write/{id:int}/{purchase}/{done:bool}/{price:int}")]
        public IActionResult Write(int id, string purchase, bool done, int price)
        {
            try
            {
                var db = new ServerDbContext();
                db.Product.Add(new Product
                {
                    Id = id,
                    Done = done,
                    Price = price,
                    Purchase = purchase
                });
                db.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }

            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return Ok();
        }
    }
}
