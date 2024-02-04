package WeatherApp.backend.DTOs;

import lombok.Data;

@Data
public class UserAuthDTO {
    private String username;
    private String password;

    public UserAuthDTO() {}

    public UserAuthDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
