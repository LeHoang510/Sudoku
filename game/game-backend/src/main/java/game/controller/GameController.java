package game.controller;


import game.model.Grid;
import game.model.Score;
import game.service.GameService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/game")
public class GameController {
    private final GameService gameService;

    public GameController(final GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping(path = "get_grids", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Grid> getGrids() {
        System.out.println("Getting all difficulty");
        return this.gameService.getGrids();
    }
    @PostMapping(path = "send_score/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Score addScore(@RequestBody final Score score, @PathVariable("level") final String level) {
        System.out.println("Adding score to database");
        return this.gameService.addScore(level, score);
    }
}
