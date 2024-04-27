package com.mentalmath.server.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mentalmath.server.model.Score;
import com.mentalmath.server.repository.ScoreRepository;
import com.mentalmath.server.service.ScoreService;

@Service
public class ScoreServiceImpl implements ScoreService {

    @Autowired
    private ScoreRepository scoreRepo;
    
    @Override
    public String save(Score score){
        scoreRepo.save(score);
        return "saved!";
    }

    @Override
    public List<Score> retrieve(){
        List<Score> topScores = new ArrayList();
        topScores = scoreRepo.findAll();
        return topScores;
    }

}
