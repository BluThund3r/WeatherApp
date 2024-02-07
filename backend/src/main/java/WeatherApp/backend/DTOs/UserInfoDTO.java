package WeatherApp.backend.DTOs;

import WeatherApp.backend.Persistence.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDTO {
    private Integer id;
    private String username;
    private boolean admin;

    public UserInfoDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.admin = user.isAdmin();
    }
}
