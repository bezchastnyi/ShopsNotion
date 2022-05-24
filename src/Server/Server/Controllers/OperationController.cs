using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Db;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    public class OperationController : Controller
    {
        private ILogger<OperationController> _logger;
        
        public OperationController(ILogger<OperationController> logger)
        {
            this._logger = logger;
        }
        
        [HttpGet]
        [Route("Read")]
        public IActionResult Read()
        {
            try
            {
                this._logger.LogInformation("Read operation: OK");
                return new JsonResult(new ServerDbContext().Product.ToList().OrderBy(x => x.Done));
            }
            catch (Exception ex)
            {
                this._logger.LogError($"Read operation: Error -> {ex.Message}");
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
                this._logger.LogError($"Write operation: Error -> {ex.Message}");
                return new JsonResult($"Bad request: {ex.Message}");
            }

            this._logger.LogInformation("Write operation: OK");
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
                this._logger.LogError($"Edit operation: Error -> {ex.Message}");
                return new JsonResult($"Bad request: {ex.Message}");
            }

            this._logger.LogInformation("Edit operation: OK");
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
                this._logger.LogError($"Delete operation: Error -> {ex.Message}");
                return new JsonResult($"Bad request: {ex.Message}");
            }

            this._logger.LogInformation("Delete operation: OK");
            return new JsonResult("OK");
        }
    }
}
