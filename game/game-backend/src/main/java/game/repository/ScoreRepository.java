package game.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import game.model.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {
}
