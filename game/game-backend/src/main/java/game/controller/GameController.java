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

    @GetMapping(path = "grids", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Grid> getGrids() {
        System.out.println("Getting all difficulty");
        return this.gameService.getGrids();
    }
    @PostMapping(path = "send_score/{level}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Score addScore(@RequestBody final Score score, @PathVariable("level") final String level) {
        System.out.println("Adding score to database");
        System.out.println(score);
        return this.gameService.addScore(level, score);
    }
    @GetMapping(path = "leaderboard/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Score> getLeaderboard(@PathVariable("level") final String level) {
        System.out.println("Getting leaderboard");
        return this.gameService.getLeaderboard(level);
    }
}
