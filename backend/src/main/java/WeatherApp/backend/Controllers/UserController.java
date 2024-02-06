package WeatherApp.backend.Controllers;

import WeatherApp.backend.DTOs.CityAddDTO;
import WeatherApp.backend.DTOs.UserAuthDTO;
import WeatherApp.backend.DTOs.UserRegisterDTO;
import WeatherApp.backend.Persistence.City;
import WeatherApp.backend.Persistence.User;
import WeatherApp.backend.Services.CityService;
import WeatherApp.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/users")
public class UserController
{
    private final UserService userService;
    private final CityService cityService;

    @Autowired
    public UserController(UserService userService, CityService cityService) {
        this.userService = userService;
        this.cityService = cityService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody UserRegisterDTO userRegisterDTO
    ) {
        if(!userService.validateRegisterData(userRegisterDTO))
            return new ResponseEntity<>("Invalid data", HttpStatus.BAD_REQUEST);

        try {
            userService.register(userRegisterDTO.getUsername(), userRegisterDTO.getPassword());
        }
        catch(IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody UserAuthDTO userLoginDTO
    ) {
        try {
            String token = userService.login(userLoginDTO.getUsername(), userLoginDTO.getPassword());
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        catch(NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(InvalidParameterException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMyFavoriteCities")
    public ResponseEntity<?> getMyFavoriteCities(
            @RequestHeader("Authorization") String token
    ) {
        if(token == null || token.isEmpty())
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        try {
            User user = userService.getUserFromToken(token);
            return new ResponseEntity<>(user.getFavoriteCities().stream().toList(), HttpStatus.OK);
        }
        catch(NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/addFavoriteCity/{cityId}")
    public ResponseEntity<?> addFavoriteCity(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer cityId
    ) {
        if(token == null || token.isEmpty())
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        try {
            User user = userService.getUserFromToken(token);
            userService.addFavoriteCity(user, cityId);
            return ResponseEntity.ok(new CityAddDTO(cityService.getCityById(cityId)));
        }
        catch(NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/removeFavoriteCity/{cityId}")
    public ResponseEntity<?> removeFavoriteCity(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer cityId
    ) {
        if(token == null || token.isEmpty())
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        try {
            User user = userService.getUserFromToken(token);
            userService.removeFavoriteCity(user, cityId);
        }
        catch(NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch(IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
