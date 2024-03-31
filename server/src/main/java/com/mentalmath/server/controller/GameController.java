package com.mentalmath.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.json.Json;
import jakarta.json.JsonObject;

import com.mentalmath.server.service.GameService;


@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class GameController {
    private int currentAnswer;

    @Autowired
    private GameService gameService;

    @GetMapping("/generate-question")
    @ResponseBody
    public ResponseEntity<String> generateQuestion(){
        String question = gameService.generateQuestion();
        JsonObject response = null;
        response = Json.createObjectBuilder()
                .add("question", question)
                .build();

        System.out.println("I generated a question!");
        System.out.println("The question is " + question);
        return ResponseEntity.ok(response.toString());
    }
}
