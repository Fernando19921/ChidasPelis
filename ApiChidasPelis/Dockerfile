# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["ApiChidasPelis/ApiChidasPelis.csproj", "ApiChidasPelis/"]
RUN dotnet restore "ApiChidasPelis/ApiChidasPelis.csproj"
COPY ApiChidasPelis/ ApiChidasPelis/
WORKDIR /src/ApiChidasPelis
RUN dotnet publish "ApiChidasPelis.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "ApiChidasPelis.dll"]
