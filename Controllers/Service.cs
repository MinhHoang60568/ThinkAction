// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
using System;
using System.Collections.Generic;

public class Service
{
    public int ServiceId { get; set; }
    public int ServiceCategoryId { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public object Link { get; set; }
    public string Icon { get; set; }
    public object CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public object ModifiedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
}

public class RootService
{
    public List<Service> data { get; set; }
}

