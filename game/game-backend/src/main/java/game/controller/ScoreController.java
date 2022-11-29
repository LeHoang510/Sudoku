package game.controller;

import game.model.Score;
import game.service.ScoreService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/leaderboard")
public class ScoreController {
    private final ScoreService scoreService;

    public ScoreController(final ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping(path = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Score> getScoreBoard() {
        System.out.println("Getting leaderboard");
        return scoreService.getLeaderboard();
    }
    @PostMapping(path = "send_score", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Score addScore(@RequestBody Score score) {
        System.out.println("Adding new high score");
        System.out.println(score);
        return scoreService.addScore(score);
    }
}
