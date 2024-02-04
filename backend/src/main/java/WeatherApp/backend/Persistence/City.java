package WeatherApp.backend.Persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.Pair;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "City")
@Table(name = "cities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {
    @Id
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name="coordinates", nullable = false)
    private Pair<Double, Double> coordinates;

    @ManyToMany(mappedBy = "favoriteCities")
    @JsonIgnore
    private Set<User> users = new HashSet<>();
}
