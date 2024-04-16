FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["WebAPI_UtalcaBus/WebAPI_UtalcaBus.csproj", "WebAPI_UtalcaBus/"]
RUN dotnet restore "WebAPI_UtalcaBus/WebAPI_UtalcaBus.csproj"
COPY . .
WORKDIR "/src/WebAPI_UtalcaBus"
RUN dotnet build "WebAPI_UtalcaBus.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "WebAPI_UtalcaBus.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebAPI_UtalcaBus.dll"]
