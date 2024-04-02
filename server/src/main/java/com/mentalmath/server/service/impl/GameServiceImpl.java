package com.mentalmath.server.service.impl;

import java.text.DecimalFormat;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.mentalmath.server.service.GameService;

@Service
public class GameServiceImpl implements GameService {
    
    private double currentAnswer;
    
    @Override
    public String generateQuestion(){
    Random random = new Random();
    int num1 = random.nextInt(10)+1;
    int num2 = random.nextInt(10)+1;

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
            currentAnswer = (double) num1 / num2;
            DecimalFormat df = new DecimalFormat("#.##");
            String formattedAnswer = df.format(currentAnswer);
            currentAnswer = Double.parseDouble(formattedAnswer);
            break;
        
        }
        System.out.println("The current answer is: " + currentAnswer);
        return num1 + " " + operator + " " + num2 + " = ";
    }


    @Override
    public String checkAnswer(double answer){
        if (answer == currentAnswer){
            return "Correct!";
        }
        else {
            return "Incorrect!";
        }
    }
   
    
}
