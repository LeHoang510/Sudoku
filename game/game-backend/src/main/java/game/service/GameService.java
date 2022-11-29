package game.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import game.model.Game;
import game.model.Grid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Service
public class GameService {
    private File file = Paths.get("src/main/resources/data/game.json").toFile();
    private ObjectMapper mapper=new ObjectMapper();
    private ObjectWriter writer= mapper.writer(new DefaultPrettyPrinter());
    public boolean starNewGame(Game game) {
        Map<String, Object> map = new HashMap<>();
        map.put("player_name", game.getPlayer_name());
        map.put("with_suggestion", game.isWith_suggestion());
        map.put("coups", 0);
        Grid grid = new Grid(game.getGrid().getGridElements(), game.getGrid().getConstant());
        map.put("grid", grid);
        try {
            writer.writeValue(file, map);
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }
    public Game getGame() {
        try {
            return mapper.readValue(file, Game.class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
    public String setPlayerName(String name) {
        try {
            Map<String, Object> game= mapper.readValue(file, new TypeReference<>() {});
            game.put("player_name", name);
            writer.writeValue(file, game);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return name;
    }
    public int addCoup(){
        try {
            Map<String, Object> game= mapper.readValue(file, new TypeReference<>() {});
            game.put("coups", (Integer) game.get("coups")+1);
            writer.writeValue(file, game);
            return (Integer) game.get("coups");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return 0;
    }
    public Grid setGrid(Grid grid){
        try {
            Map<String, Object> game= mapper.readValue(file, new TypeReference<>() {});
            game.put("grid", grid);
            writer.writeValue(file, game);
            return (Grid) game.get("grid");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
