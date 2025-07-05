package com.media4all.backend.infraestructure.repository;

import com.media4all.backend.infraestructure.entitys.SyncStatistic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SyncStatisticRepository extends JpaRepository<SyncStatistic, Long> {
}