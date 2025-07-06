package com.media4all.backend.controller;

import com.media4all.backend.business.PrinterService;
import com.media4all.backend.dto.PrinterDTO;
import com.media4all.backend.dto.PrinterStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/printers")
@RequiredArgsConstructor
public class PrinterController {
    private final PrinterService printerService;

    @PostMapping
    public ResponseEntity<Void> addPrinter(@RequestBody PrinterDTO printerDTO) {
        printerService.addPrinter(printerDTO);
        return ResponseEntity.created(URI.create("/api/v1/printers")).build();
    }

    @GetMapping
    public ResponseEntity<Page<PrinterDTO>> getAllPrinters(
            @PageableDefault(size = 20, sort = "name") Pageable pageable,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String status,
            @RequestParam(required = false, defaultValue = "name") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir) {
        Page<PrinterDTO> printers = printerService.getAllPrinters(pageable, name, model, location, status, sortBy, sortDir);
        return ResponseEntity.ok(printers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrinterDTO> getPrinterById(@PathVariable UUID id) {
        PrinterDTO printer = printerService.getPrinterById(id);
        return ResponseEntity.ok(printer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePrinter(@PathVariable UUID id, @RequestBody PrinterDTO printerDTO) {
        printerService.updatePrinter(id, printerDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrinter(@PathVariable UUID id) {
        printerService.deletePrinter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<PrinterStatusResponse> getPrinterStatus(@PathVariable UUID id) {
        PrinterDTO printer = printerService.getPrinterById(id);
        PrinterStatusResponse response = new PrinterStatusResponse(
                printer.getStatus(),
                printer.getPaperCapacity()
        );
        return ResponseEntity.ok(response);
    }
}