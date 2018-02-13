package com.ford.afd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ford.afd.model.FoundationDataColumn;

public interface FoundationDataColumnRepository extends JpaRepository<FoundationDataColumn, Integer> {
	
	/**
	 * Checks if uiColumnName already existing in FoundationDataColumn table..
	 * @param uiColumnName
	 * @return
	 */
	 boolean existsByUiColumnName(String uiColumnName);
}
