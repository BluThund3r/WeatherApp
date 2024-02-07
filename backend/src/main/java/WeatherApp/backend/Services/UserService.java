package WeatherApp.backend.Services;

import WeatherApp.backend.DTOs.UserRegisterDTO;
import WeatherApp.backend.Persistence.City;
import WeatherApp.backend.Persistence.User;
import WeatherApp.backend.Repositories.UserRepository;
import WeatherApp.backend.Utils.JwtUtils;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final CityService cityService;

    @Autowired
    public UserService(UserRepository userRepository, JwtUtils jwtUtils, CityService cityService) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.cityService = cityService;
    }

    public boolean isUsernameAvailable(String username) {
        return userRepository.findByUsername(username) == null;
    }

    public String login(String username, String password)
            throws InvalidParameterException, NoSuchElementException {
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new NoSuchElementException("User not found");

        if(!BCrypt.checkpw(password, userRepository.findByUsername(username).getPasswordHash()))
            throw new InvalidParameterException("Invalid password");

        return jwtUtils.createToken(user);
    }

    public void register(String username, String password) {
        if(!isUsernameAvailable(username))
            throw new IllegalArgumentException("Username already taken");

        String hashedPass = BCrypt.hashpw(password, BCrypt.gensalt());
        userRepository.save(new User(username, hashedPass));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserById(Integer id)
            throws NoSuchElementException, IllegalArgumentException {
        User user = userRepository.findById(id).orElse(null);
        if(user == null)
            throw new NoSuchElementException("User not found");

        if(user.isAdmin())
            throw new IllegalArgumentException("Cannot delete an admin");

        for(City city : user.getFavoriteCities())
            city.getUsers().remove(user);
        cityService.saveAllCities(user.getFavoriteCities());
        userRepository.deleteById(id);
    }

    public User getUserFromToken(String token)
            throws NoSuchElementException {
        String username = jwtUtils.resolveClaims(token).getSubject();
        User user = userRepository.findByUsername(username);
        if(user == null)
            throw new NoSuchElementException("User not found");
        return user;
    }

    public void addFavoriteCity(User user, Integer cityId) throws NoSuchElementException, IllegalArgumentException {
        City cityToAdd = cityService.getCityById(cityId);
        if(cityToAdd == null)
            throw new NoSuchElementException("City not found");

        Set<City> userCities = user.getFavoriteCities();
        if(userCities.contains(cityToAdd))
            throw new IllegalArgumentException("City already in favorites");

        user.getFavoriteCities().add(cityToAdd);
        cityToAdd.getUsers().add(user);
        userRepository.save(user);
    }

    public void removeFavoriteCity(User user, Integer cityId) {
        City cityToRemove = cityService.getCityById(cityId);
        if(cityToRemove == null)
            throw new NoSuchElementException("City not found");

        Set<City> userCities = user.getFavoriteCities();
        if(!userCities.contains(cityToRemove))
            throw new IllegalArgumentException("City not in favorites");

        user.getFavoriteCities().remove(cityToRemove);
        cityToRemove.getUsers().remove(user);
        userRepository.save(user);
    }

    public boolean validateRegisterData(UserRegisterDTO userRegisterDTO) {
        if(userRegisterDTO.getUsername().length() < 3 || userRegisterDTO.getUsername().length() > 32)
            return false;
        if(userRegisterDTO.getPassword().length() > 32)
            return false;
        return userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword());
    }

    public boolean isAdminByToken(String token) {
        return jwtUtils.resolveClaims(token).get("isAdmin", Boolean.class);
    }
}
