using AutoMapper;
using ApiChidasPelis.Dtos;
using ApiChidasPelis.Models;

namespace ApiChidasPelis
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<ContentCreateDto, Content>();
      CreateMap<Content, ContentReadDto>();

      CreateMap<FavoritesCreateDto, Favorites>();

    }
  }
}
