// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
using System;

public class NewsDetail
{
    public int ArticleId { get; set; }
    public string ArticleCategoryId { get; set; }
    public string Title { get; set; }
    public string SummaryContent { get; set; }
    public string Content { get; set; }
    public string PublishedBy { get; set; }
    public string Slug { get; set; }
    public string Hashtag { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ModifiedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public string Thumbnail { get; set; }
}

public class RootNews
{
    public NewsDetail newsDetail { get; set; }
}

