package com.ford.afd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ford.afd.model.FoundationData;

public interface FoundationDataRepository extends JpaRepository<FoundationData, Long> {
}
