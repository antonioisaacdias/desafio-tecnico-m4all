package com.media4all.backend.infraestructure.dto;

import lombok.Data;

@Data
public class ExternalPrinterDTO {
    private String id;
    private String name;
    private String model;
    private String location;
    private String status;
    private Integer paperCapacity;
    private String createdAt;
}