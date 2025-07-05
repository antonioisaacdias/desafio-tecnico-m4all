package com.media4all.backend.controller;

import com.media4all.backend.business.PrinterService;
import com.media4all.backend.dto.PrinterStatusResponse;
import com.media4all.backend.infraestructure.entitys.Printer;
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
    public ResponseEntity<Void> addPrinter(@RequestBody Printer printer) {
        printerService.addPrinter(printer);
        return ResponseEntity.created(
                URI.create("/api/v1/printers/" + printer.getId())
        ).build();
    }

    @GetMapping
    public ResponseEntity<Page<Printer>> getAllPrinters(
            @PageableDefault(size = 20, sort = "name") Pageable pageable) {
        Page<Printer> printers = printerService.getAllPrinters(pageable);
        return ResponseEntity.ok(printers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Printer> getPrinterById(@PathVariable UUID id) {
        Printer printer = printerService.getPrinterById(id);
        return ResponseEntity.ok(printer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePrinter(@PathVariable UUID id, @RequestBody Printer printer) {
        printerService.updatePrinter(id, printer);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrinter(@PathVariable UUID id) {
        printerService.deletePrinter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<PrinterStatusResponse> getPrinterStatus(@PathVariable UUID id) {
        Printer printer = printerService.getPrinterById(id);
        PrinterStatusResponse response = new PrinterStatusResponse(
                printer.getStatus().name(),
                printer.getPaperCapacity()
        );
        return ResponseEntity.ok(response);
    }
}