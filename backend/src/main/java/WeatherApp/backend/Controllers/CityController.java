package WeatherApp.backend.Controllers;

import WeatherApp.backend.DTOs.CityAddDTO;
import WeatherApp.backend.Services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
