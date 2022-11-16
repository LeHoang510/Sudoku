package game.repository;

import org.springframework.data.repository.CrudRepository;

import game.model.Score;

public interface ScoreRepository extends CrudRepository<Score, Long> {
}
