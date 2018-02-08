package com.ford.afd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ford.afd.model.FoundationDataRow;

public interface FoundationDataRowRepository extends CrudRepository<FoundationDataRow, Long> {
	List<FoundationDataRow> findByRowId(long rowId);
	
	@Transactional
	void removeByRowId(long rowId);
	
	@Query("select distinct rowId from FoundationDataRow")
	List<Long> findDistinctRowIds();
	
	@Query("select coalesce(max(rowId), 0) from FoundationDataRow")
	Long getMaxRowId();

}
