package WeatherApp.backend.Controllers;

import WeatherApp.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import WeatherApp.backend.DTOs.UserInfoDTO;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers(
            @RequestHeader("Authorization") String token
    ) {
        boolean  isAdmin = userService.isAdminByToken(token);
        if(!isAdmin)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not an admin");

        return ResponseEntity.ok(userService.getAllUsers().stream().map(UserInfoDTO::new).toList());
    }

    @DeleteMapping("/deleteUserById/{userId}")
    public ResponseEntity<?> deleteUserById(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer userId
    ) {
        boolean isAdmin = userService.isAdminByToken(token);
        if(!isAdmin)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not an admin");

        try {
            userService.deleteUserById(userId);
        }
        catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }
}
