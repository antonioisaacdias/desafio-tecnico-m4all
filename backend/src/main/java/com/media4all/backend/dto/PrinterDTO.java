package com.media4all.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.UUID;

@Data
public class PrinterDTO {

    @NotEmpty(message = "O nome da impressora é obrigatório")
    private String name;

    private String model;

    private String location;

    private String status;

    @PositiveOrZero(message = "A capacidade de papel deve ser um número positivo ou zero")
    private Integer paperCapacity;

}
