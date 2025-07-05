package com.media4all.backend.infraestructure.entitys;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder

public class Printer {
    @Id
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "model")
    private String model;

    @Column(name = "location")
    private String location;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PrinterStatus status;

    @Column(name = "paper_capacity")
    private Integer paperCapacity;

    @Column(name = "created_at")
    private Instant createdAt;
}
