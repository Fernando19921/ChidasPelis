namespace ApiChidasPelis.Dtos
{
    public class ContentReadDto
    {
        public int ContentId { get; set; }
        public string Name { get; set; } = null!;
        public string? Img { get; set; }
        public string? Director{ get; set; }
        public int? Time { get; set; }
        public string? Trailer { get; set; }
        public decimal? Rating { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public string GenderName { get; set; } = null!;
        public string ContentTypeName { get; set; } = null!;
    }
}
