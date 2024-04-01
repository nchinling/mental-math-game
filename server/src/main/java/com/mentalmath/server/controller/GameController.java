package com.mentalmath.server.controller;

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


    @PostMapping(path="/check-answer", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseBody
    public ResponseEntity<String> checkAnswer(@RequestBody MultiValueMap<String, String> form) throws Exception {

        double answer = Double.parseDouble(form.getFirst("answer"));
        System.out.println("The answer received is: " + answer);
        String markedQuestion = gameService.checkAnswer(answer);
        System.out.println("The marked answer is: " + markedQuestion);

        JsonObject response = null;
        response = Json.createObjectBuilder()
                .add("markedQuestion", markedQuestion)
                .build();

        return ResponseEntity.ok(response.toString());
    }
}
