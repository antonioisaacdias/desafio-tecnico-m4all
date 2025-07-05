package com.media4all.backend.infraestructure.client;

import com.media4all.backend.infraestructure.dto.ExternalPrinterDTO;
import com.media4all.backend.infraestructure.dto.ExternalPrinterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ExternalApiClient {

    @Value("${external.api.printers.url}")
    private String printersUrl;

    private final RestTemplate restTemplate;

    public List<ExternalPrinterDTO> fetchPrinters() {
        ExternalPrinterResponse response = restTemplate.getForObject(printersUrl, ExternalPrinterResponse.class);
        return response.getData();
    }
}