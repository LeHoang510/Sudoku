package game.controller;


import game.model.Game;
import game.model.Grid;
import game.service.GameService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/game")
public class GameController {
    private final GameService gameService;

    public GameController(final GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping(path = "new_game", consumes = MediaType.APPLICATION_JSON_VALUE)
    public boolean startNewGame(@RequestBody Game game) {
        System.out.println("Starting a new game");
        return this.gameService.starNewGame(game);
    }
    @GetMapping(path = "game", produces = MediaType.APPLICATION_JSON_VALUE)
    public Game getGame() {
        System.out.println("Getting current Game");
        return this.gameService.getGame();
    }
    @PostMapping(path = "set_name/{name}")
    public String setName(@PathVariable("name") String name) {
        System.out.println("Updating player name");
        return this.gameService.setPlayerName(name);
    }
    @PostMapping(path = "add_coup")
    public int addCoup() {
        System.out.println("Adding coup");
        return this.gameService.addCoup();
    }
    @PostMapping(path = "set_grid", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Grid setGrid(@RequestBody Grid grid) {
        System.out.println("Setting grid");
        return this.gameService.setGrid(grid);
    }
}
