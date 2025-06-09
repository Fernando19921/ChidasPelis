namespace ApiChidasPelis.Dtos
{
    public class FavoritesReadDto
    {
        public int IdFavorite { get; set; }
        public string UserName { get; set; } = null!;
        public string ContentName { get; set; } = null!;
        public string? Img { get; set; }
    }
}