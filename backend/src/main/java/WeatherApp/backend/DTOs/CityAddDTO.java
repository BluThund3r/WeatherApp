package WeatherApp.backend.DTOs;

import WeatherApp.backend.Persistence.City;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.antlr.v4.runtime.misc.Pair;
import java.util.HashSet;

@Data
public class CityAddDTO {
    private Integer id;
    private String name;
    private String country;
    private String state;
    @JsonProperty("coord")
    private Coords coords;

    public static class Coords {
        @JsonProperty("lon")
        private Double longitude;

        @JsonProperty("lat")
        private Double latitude;
    }

    public CityAddDTO() {}

    public CityAddDTO(
            Integer id,
            String name,
            String country,
            String state,
            Double latitude, 
            Double longitude
    ) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.state = state;
        this.coords.latitude = latitude;
        this.coords.longitude = longitude;
    }

    public City toCity() {
        return new City(
                id,
                name,
                country,
                state,
                new Pair<>(coords.latitude, coords.longitude),
                new HashSet<>()
        );
    }
}
