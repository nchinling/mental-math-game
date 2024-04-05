package com.mentalmath.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    private Integer level;
    private Integer score;
    public Score() {
    }
    public Score(Integer id, String name, Integer level, Integer score) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.score = score;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getLevel() {
        return level;
    }
    public void setLevel(Integer level) {
        this.level = level;
    }
    public Integer getScore() {
        return score;
    }
    public void setScore(Integer score) {
        this.score = score;
    }
    @Override
    public String toString() {
        return "Score [id=" + id + ", name=" + name + ", level=" + level + ", score=" + score + "]";
    }


}
