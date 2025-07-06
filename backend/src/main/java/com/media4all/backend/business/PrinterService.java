package com.media4all.backend.business;

import com.media4all.backend.dto.PrinterDTO;
import com.media4all.backend.infraestructure.entitys.Printer;
import com.media4all.backend.infraestructure.entitys.PrinterStatus;
import com.media4all.backend.infraestructure.repository.PrinterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
        return getAllPrinters(pageable, null, null, null, null, "name", "asc");
    }

    public Page<PrinterDTO> getAllPrinters(Pageable pageable, String name, String model, String location, String status) {
        return getAllPrinters(pageable, name, model, location, status, "name", "asc");
    }

    public Page<PrinterDTO> getAllPrinters(Pageable pageable, String name, String model, String location, String status, String sortBy, String sortDir) {
        // Criar novo Pageable com ordenação personalizada
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        
        // Validar campo de ordenação
        String validSortBy = validateSortField(sortBy);
        Sort sort = Sort.by(direction, validSortBy);
        Pageable customPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        
        Page<Printer> printers;
        
        if (name != null || model != null || location != null || status != null) {
            printers = repository.findWithFilters(name, model, location, status, customPageable);
        } else {
            printers = repository.findAll(customPageable);
        }
        
        return new PageImpl<>(
                printers.getContent().stream().map(this::toDTO).collect(Collectors.toList()),
                customPageable,
                printers.getTotalElements()
        );
    }

    private String validateSortField(String sortBy) {
        switch (sortBy != null ? sortBy.toLowerCase() : "name") {
            case "name":
                return "name";
            case "model":
                return "model";
            case "status":
                return "status";
            case "location":
                return "location";
            case "papercapacity":
                return "paperCapacity";
            default:
                return "name";
        }
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
        dto.setId(printer.getId());
        dto.setName(printer.getName());
        dto.setModel(printer.getModel());
        dto.setLocation(printer.getLocation());
        dto.setStatus(printer.getStatus() != null ? printer.getStatus().name() : null);
        dto.setPaperCapacity(printer.getPaperCapacity());
        return dto;
    }
}