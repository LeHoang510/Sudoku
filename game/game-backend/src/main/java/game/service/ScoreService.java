package game.service;

import game.model.Score;
import game.repository.ScoreRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Setter
@Service
public class ScoreService {
    private final ScoreRepository scoreRepository;

    public ScoreService(final ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;

    }
    public List<Score> getLeaderboard() {
        return (List<Score>) scoreRepository.findAll();
    }
    public void saveLeaderboard(final List<Score> scores) {
        scoreRepository.saveAll(scores);
    }
}
