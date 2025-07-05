package com.media4all.backend.infraestructure.dto;

import lombok.Data;
import java.util.List;

@Data
public class ExternalPrinterResponse {
    private int total;
    private List<ExternalPrinterDTO> data;
}