package com.example.GigAnt.checkingAnswer.answer;

import com.example.GigAnt.model.entity.Question;

public interface StrategyCheck {
    public int calculatePoints(Question question);
}
