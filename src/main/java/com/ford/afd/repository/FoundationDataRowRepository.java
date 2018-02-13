package com.ford.afd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ford.afd.model.FoundationDataRow;

public interface FoundationDataRowRepository extends CrudRepository<FoundationDataRow, Integer> {
	List<FoundationDataRow> findByRowId(int rowId);
	
	@Transactional
	void removeByRowId(int rowId);
	
	@Query("select distinct rowId from FoundationDataRow")
	List<Integer> findDistinctRowIds();
	
	@Query("select coalesce(max(rowId), 0) from FoundationDataRow")
	Integer getMaxRowId();
	
	/**
	 * Checks if columnValue already existing for given column in FoundationDataRow table.
	 * @param columnId
	 * @param columnValue
	 * @return
	 */
	 boolean existsByColumnIdAndColumnValue(int columnId, String columnValue);
	 
	 /**
	  * For retrieving record using columnId and columnValue.
	  * @param columnId
	  * @param columnValue
	  * @return
	  */
	 List<FoundationDataRow> findByColumnIdAndColumnValue(int columnId, String columnValue);
}
