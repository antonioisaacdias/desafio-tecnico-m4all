package com.media4all.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PrinterStatusResponse {
    private String status;
    private Integer paperCapacity;
}