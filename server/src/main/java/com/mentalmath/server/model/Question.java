package com.mentalmath.server.model;

public class Question {
    private String question;

    public Question() {
    }

    public Question(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @Override
    public String toString() {
        return "Question [question=" + question + "]";
    }

    
}
