package com.ford.afd.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ford.afd.model.FoundationDataRow;

public interface FoundationDataRowRepository extends CrudRepository<FoundationDataRow, Long> {
	List<FoundationDataRow> findByRowId(long rowId);
	
	@Transactional
	void removeByRowId(long rowId);
}
