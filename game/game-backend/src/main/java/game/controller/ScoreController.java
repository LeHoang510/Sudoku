package game.controller;

import game.model.Score;
import game.service.ScoreService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/leaderboard")
public class ScoreController {
    private final ScoreService scoreService;

    public ScoreController(final ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping(path = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Score> getScoreBoard() {
        return scoreService.getLeaderboard();
    }
}
