package com.mentalmath.server.service;

import java.util.List;

import com.mentalmath.server.model.Score;

public interface ScoreService {
    String save(Score score);
    List<Score> retrieve();

}
