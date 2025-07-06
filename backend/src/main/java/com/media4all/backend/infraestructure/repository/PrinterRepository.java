package com.media4all.backend.infraestructure.repository;

import com.media4all.backend.infraestructure.entitys.Printer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PrinterRepository extends JpaRepository<Printer, UUID> {
    Optional<Printer> findByNameIgnoreCase(String name);
}
