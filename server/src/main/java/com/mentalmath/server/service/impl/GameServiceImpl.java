package com.mentalmath.server.service.impl;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.mentalmath.server.service.GameService;

@Service
public class GameServiceImpl implements GameService {
    
    private int currentAnswer;
    
    @Override
    public String generateQuestion(){
    Random random = new Random();
    int num1 = random.nextInt(10);
    int num2 = random.nextInt(10);

    String[] operators = {"+", "-", "*", "/"};

    String operator = operators[random.nextInt(operators.length)];

    switch (operator){
        case "+":
            currentAnswer = num1 + num2;
            break;
        case "-":
            currentAnswer = num1 - num2;
            break;
        case "*":
            currentAnswer = num1 * num2;
            break;
        case "/":
            currentAnswer = num1 / num2;
            break;
        
        }
        return num1 + " " + operator + " " + num2 + " = ";
    }


    @Override
    public String checkAnswer(int answer){
        if (answer == currentAnswer){
            return "Correct!";
        }
        else {
            return "Incorrect!";
        }
    }
   
    
}
