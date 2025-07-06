package com.media4all.backend.infraestructure.repository;

import com.media4all.backend.infraestructure.entitys.Printer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface PrinterRepository extends JpaRepository<Printer, UUID> {
    Optional<Printer> findByNameIgnoreCase(String name);
    
    @Query("SELECT p FROM Printer p WHERE " +
           "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:model IS NULL OR LOWER(p.model) LIKE LOWER(CONCAT('%', :model, '%'))) AND " +
           "(:location IS NULL OR LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:status IS NULL OR UPPER(p.status) = UPPER(:status))")
    Page<Printer> findWithFilters(@Param("name") String name, 
                                  @Param("model") String model, 
                                  @Param("location") String location, 
                                  @Param("status") String status, 
                                  Pageable pageable);
}
