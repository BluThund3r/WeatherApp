package WeatherApp.backend.Repositories;

import WeatherApp.backend.Persistence.City;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
    @Query("select c from City c where c.name like ?1 || '%'")
    List<City> findByNameStartingWith(String name);

    @Query("select c from City c where c.name = ?1")
    City findByName(String name);

    @Query(value = "SELECT * FROM cities ORDER BY POW((latitude - :latitude), 2) + POW((longitude - :longitude), 2) LIMIT 1", nativeQuery = true)
    City findByCoordinates(@Param("latitude") Double latitude, @Param("longitude") Double longitude);
}
