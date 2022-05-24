using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Server.Db;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    public class OperationController : Controller
    {
        [HttpGet]
        [Route("Read")]
        public IActionResult Read()
        {
            try
            {
                return new JsonResult(new ServerDbContext().Product.ToList().OrderBy(x => x.Done));
            }
            catch (Exception ex)
            {
                return new JsonResult($"Bad request: {ex.Message}");
            }
        }
        
        [HttpGet]
        [Route("Write/{purchase}/{done:bool}/{price:int}")]
        public IActionResult Write(string purchase, bool done, int price)
        {
            try
            {
                var db = new ServerDbContext();
                db.Product.Add(new Product
                {
                    Done = done,
                    Price = price,
                    Purchase = purchase
                });
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return new JsonResult($"Bad request: {ex.Message}");
            }

            return new JsonResult("OK");
        }
        
        [HttpGet]
        [Route("Edit/{id:int}/{purchase}/{done:bool}/{price:int}")]
        public IActionResult Edit(int id, string purchase, bool done, int price)
        {
            try
            {
                var db = new ServerDbContext();

                var product = db.Product.FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return new JsonResult("Product not found");
                }

                product.Purchase = purchase;
                product.Done = done;
                product.Price = price;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return new JsonResult($"Bad request: {ex.Message}");
            }

            return new JsonResult("OK");
        }
        
        [HttpGet]
        [Route("Delete/{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var db = new ServerDbContext();

                var product = db.Product.FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return new JsonResult("Product not found");
                }

                db.Product.Remove(product);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                return new JsonResult($"Bad request: {ex.Message}");
            }

            return new JsonResult("OK");
        }
    }
}
