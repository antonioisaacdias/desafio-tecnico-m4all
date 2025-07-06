package com.media4all.backend.business;

import com.media4all.backend.dto.PrinterDTO;
import com.media4all.backend.infraestructure.entitys.Printer;
import com.media4all.backend.infraestructure.entitys.PrinterStatus;
import com.media4all.backend.infraestructure.repository.PrinterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrinterService {
    private final PrinterRepository repository;

    public void addPrinter(PrinterDTO dto) {
        Printer printer = toEntity(dto);
        repository.save(printer);
    }

    public Page<PrinterDTO> getAllPrinters(Pageable pageable) {
        Page<Printer> printers = repository.findAll(pageable);
        return new PageImpl<>(
                printers.getContent().stream().map(this::toDTO).collect(Collectors.toList()),
                pageable,
                printers.getTotalElements()
        );
    }

    public PrinterDTO getPrinterById(UUID id) {
        Printer printer = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Printer not found with ID: " + id));
        return toDTO(printer);
    }

    public void updatePrinter(UUID id, PrinterDTO dto) {
        Printer actualPrinter = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Printer not found with ID: " + id));
        Printer updatedPrinter = Printer.builder()
                .id(actualPrinter.getId())
                .name(dto.getName() != null ? dto.getName() : actualPrinter.getName())
                .model(dto.getModel() != null ? dto.getModel() : actualPrinter.getModel())
                .location(dto.getLocation() != null ? dto.getLocation() : actualPrinter.getLocation())
                .status(dto.getStatus() != null ? PrinterStatus.valueOf(dto.getStatus().toUpperCase()) : actualPrinter.getStatus())
                .paperCapacity(dto.getPaperCapacity() != null ? dto.getPaperCapacity() : actualPrinter.getPaperCapacity())
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

    private Printer toEntity(PrinterDTO dto) {
        return Printer.builder()
                .name(dto.getName())
                .model(dto.getModel())
                .location(dto.getLocation())
                .status(dto.getStatus() != null ? PrinterStatus.valueOf(dto.getStatus().toUpperCase()) : null)
                .paperCapacity(dto.getPaperCapacity())
                .build();
    }

    private PrinterDTO toDTO(Printer printer) {
        PrinterDTO dto = new PrinterDTO();
        dto.setName(printer.getName());
        dto.setModel(printer.getModel());
        dto.setLocation(printer.getLocation());
        dto.setStatus(printer.getStatus() != null ? printer.getStatus().name() : null);
        dto.setPaperCapacity(printer.getPaperCapacity());
        return dto;
    }
}