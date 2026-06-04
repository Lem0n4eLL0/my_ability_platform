package com.example.GigAnt.model.dto.external;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class QuestionTypeQuantity {
    private int option;
    private int choice;
    private int text;
    private int code;


}
