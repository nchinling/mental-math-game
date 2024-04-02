package com.mentalmath.server.controller;

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

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class ScoreController {
    

    @PostMapping(path="/save-score", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseBody
    public ResponseEntity<String> saveScore(@RequestBody MultiValueMap<String, String> form){
        // String question = gameService.generateQuestion();

        int score = Integer.parseInt(form.getFirst("score"));
        String name = form.getFirst("name"); 
        System.out.println("The score received is: " + score);
        JsonObject response = null;
        response = Json.createObjectBuilder()
                .add("message", "score saved!")
                .build();

        return ResponseEntity.ok(response.toString());
    }
}
