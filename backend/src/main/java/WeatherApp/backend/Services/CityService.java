package WeatherApp.backend.Services;

import WeatherApp.backend.DTOs.CityAddDTO;
import WeatherApp.backend.Persistence.City;
import WeatherApp.backend.Repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public void addCity(CityAddDTO cityAddDTO) {
        cityRepository.save(cityAddDTO.toCity());
    }

    public List<City> getALlCities() {
        return cityRepository.findAll();
    }

    public List<City> getCitiesStartingWith(String name) {
        return cityRepository.findByNameStartingWith(name);
    }

    public City getCityById(int id) {
        return cityRepository.findById(id).orElse(null);
    }

    public City getCityByName(String name) {
        return cityRepository.findByName(name);
    }

    public void saveCity(City city) {
        cityRepository.save(city);
    }
}
