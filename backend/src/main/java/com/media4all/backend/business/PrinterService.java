package com.media4all.backend.business;

import com.media4all.backend.infraestructure.entitys.Printer;
import com.media4all.backend.infraestructure.repository.PrinterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrinterService {
    private final PrinterRepository repository;

    public void addPrinter(Printer printer) {
        if (printer.getId() != null && repository.existsById(printer.getId())) {
            throw new IllegalArgumentException("Printer already exists with ID: " + printer.getId());
        }
        repository.save(printer);
    }

    public Page<Printer> getAllPrinters(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Printer getPrinterById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Printer not found with ID: " + id));
    }

    public void updatePrinter(UUID id, Printer printer) {
        Printer actualPrinter = getPrinterById(id);
        Printer updatedPrinter = Printer.builder()
                .id(actualPrinter.getId())
                .name(printer.getName() != null ? printer.getName() : actualPrinter.getName())
                .model(printer.getModel() != null ? printer.getModel() : actualPrinter.getModel())
                .location(printer.getLocation() != null ? printer.getLocation() : actualPrinter.getLocation())
                .status(printer.getStatus() != null ? printer.getStatus() : actualPrinter.getStatus())
                .paperCapacity(printer.getPaperCapacity() != null ? printer.getPaperCapacity() : actualPrinter.getPaperCapacity())
                .createdAt(actualPrinter.getCreatedAt())
                .build();
        repository.save(updatedPrinter);
    }

    public void deletePrinter(UUID id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Printer not found with ID: " + id);
        }
        repository.deleteById(id);
    }
}