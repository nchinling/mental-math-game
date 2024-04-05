package com.mentalmath.server.service;

import com.mentalmath.server.model.Score;

public interface ScoreService {
    String save(Score score);
    String retrieve();
}
