package com.mentalmath.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentalmath.server.model.Score;
import com.mentalmath.server.repository.ScoreRepository;
import com.mentalmath.server.service.ScoreService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class ScoreController {
    
    
    @Autowired
    private ScoreService scoreService;

    @PostMapping(path="/save-score",  consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> saveScore(@RequestBody Score score){

        try {
            System.out.println("The score is: "+ score.getScore());
            String saveScore = scoreService.save(score);
            
            JsonObject response = null;
            response = Json.createObjectBuilder()
                    .add("message", "score saved!")
                    .build();
            return ResponseEntity.ok(response.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving score: " + e.getMessage());
        }

    }

    @GetMapping(path="/topscore",  consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getTopScore(){

        try {
            JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
            List<Score> topScore = scoreService.retrieve();
            // for (Score score: topScore){
            //     System.out.println("The score is: " + score);
            // }

            topScore.stream()
                .map(eachScore -> Json.createObjectBuilder()
                            .add("id", eachScore.getId())
                            .add("name", eachScore.getName())
                            .add("level", eachScore.getLevel())
                            .add("score", eachScore.getScore())
                            .build()
                )
			.forEach(json -> arrBuilder.add(json));
            String returnedArray = arrBuilder.build().toString();
            System.out.println(">>>>>>Returning top 10 data");

		    return ResponseEntity.ok(returnedArray);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting score: " + e.getMessage());
        }

    }
}
