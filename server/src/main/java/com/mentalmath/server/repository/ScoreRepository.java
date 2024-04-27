package com.mentalmath.server.repository;

import java.util.List;

import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mentalmath.server.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    
    public List<Score> findTopByOrderByScoreDesc();
    // public List<Score> findByOrderScores();


}
