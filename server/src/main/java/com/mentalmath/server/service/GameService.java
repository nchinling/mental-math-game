package com.mentalmath.server.service;

public interface GameService {
    String generateQuestion();
    String checkAnswer(double answer);
}
