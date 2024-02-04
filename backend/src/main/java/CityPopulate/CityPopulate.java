package CityPopulate;
import WeatherApp.backend.DTOs.CityAddDTO;
import WeatherApp.backend.Services.CityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Paths;
import java.util.Arrays;

@Component
public class CityPopulate implements CommandLineRunner {

    private final CityService cityService;

    @Autowired
    public CityPopulate(CityService cityService) {
        this.cityService = cityService;
    }

    @Override
    public void run(String... args) {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println("Populating cities");
        try {
            InputStream inputStream = new ClassPathResource("static/city.list.json").getInputStream();
            CityAddDTO[] cities = mapper.readValue(inputStream, CityAddDTO[].class);
            Arrays.asList(cities).forEach(cityService::addCity);
            System.out.printf("Populated %d cities\n", cities.length);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
