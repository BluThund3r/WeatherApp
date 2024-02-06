package WeatherApp.backend.Controllers;

import WeatherApp.backend.DTOs.CityAddDTO;
import WeatherApp.backend.Persistence.City;
import WeatherApp.backend.Services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/cities")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/getCitiesStartingWith/{cityPrefix}")
    public ResponseEntity<?> getCitiesStartingWith(
            @PathVariable String cityPrefix
    ) {
        List<CityAddDTO> cityList = cityService.getCitiesStartingWith(cityPrefix).stream().map(CityAddDTO::new).toList();
        cityList.forEach(System.out::println);
        return ResponseEntity.ok(cityList);
    }

    @GetMapping("/getCityByCoordinates/{latitude}/{longitude}")
    public ResponseEntity<?> getCityByCoordinates (
            @PathVariable Double latitude,
            @PathVariable Double longitude
    ) {
        try {
            City city = cityService.getCityByCoordinates(latitude, longitude);
            return ResponseEntity.ok(new CityAddDTO(city));
        }
        catch(NoSuchElementException e) {
            return new ResponseEntity<>("City not found", HttpStatus.NOT_FOUND);
        }
        catch(Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCityById/{cityId}")
    public ResponseEntity<?> getCityById(
            @PathVariable Integer cityId
    ) {
        City city = cityService.getCityById(cityId);
        if(city == null)
            return new ResponseEntity<>("City not found", HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(new CityAddDTO(city));
    }

//    @PutMapping("/updateCities")
//    public ResponseEntity<?> updateCities() {
//        cityService.updateCities();
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

}
