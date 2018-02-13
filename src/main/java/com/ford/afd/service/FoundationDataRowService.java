package com.ford.afd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.model.FoundationDataRow;
import com.ford.afd.repository.FoundationDataColumnRepository;
import com.ford.afd.repository.FoundationDataRowRepository;

/**
 * 
 * Service class to perform add, remove, update,search operation in FoundationDataRow table.
 */
@Service
public class FoundationDataRowService {
	
    @Autowired
    private FoundationDataRowRepository foundationDataRowRepository;
    
	@Autowired
    private FoundationDataColumnRepository foundationDataColumnRepository;

    public List<FoundationDataRow> allFoundationDataRow() {
           	
    	Iterable<FoundationDataRow> itrIist = foundationDataRowRepository.findAll();
    	List<FoundationDataRow> list = new ArrayList<FoundationDataRow>();
    	for (FoundationDataRow data : itrIist) {
    		list.add(data);
    	}
    	
    	return list;
    }
    
    public List<Integer> allFoundationDataRowIds() {
    	return foundationDataRowRepository.findDistinctRowIds();
    }

    public FoundationDataRow findFoundationDataRowById(int id) {
        return foundationDataRowRepository.findOne(id);
    }
    
    public List<FoundationDataRow> findFoundationDataRowByRowId(int rowId) {
        return foundationDataRowRepository.findByRowId(rowId);
    }

    public FoundationDataRow saveFoundationDataRow(FoundationDataRow foundationDataRow) {
        return foundationDataRowRepository.save(foundationDataRow);
    }

    public void deleteFoundationDataRow(FoundationDataRow foundationDataRow) {
        foundationDataRowRepository.delete(foundationDataRow);
    }
    
    public void deleteFoundationDataRowByRowId(int rowId) {
        foundationDataRowRepository.removeByRowId(rowId);
    }
    
    public int findNewRowId() {
    	return foundationDataRowRepository.getMaxRowId() + 1;
    }
    
    public List<String> getColumnNamesHavingDuplicateValues(List<FoundationDataRow> foundationDataRowList, boolean updateMode) {
    	List<String> duplicateColumnNames  = new ArrayList<String>();
    	
		for (FoundationDataRow foundationDataRow : foundationDataRowList) {
			
			FoundationDataColumn foundationDataColumn = foundationDataColumnRepository.findOne(foundationDataRow.getColumnId());
			if (foundationDataColumn.isUniqueColumn() 
					&& foundationDataRowRepository.existsByColumnIdAndColumnValue(foundationDataRow.getColumnId(), foundationDataRow.getColumnValue())) {
				if (!updateMode) {
					duplicateColumnNames.add(foundationDataColumn.getUiColumnName());
				} else if (updateMode && foundationDataRowRepository.findByColumnIdAndColumnValue(
						foundationDataRow.getColumnId(), foundationDataRow.getColumnValue()).size() > 1) {
					duplicateColumnNames.add(foundationDataColumn.getUiColumnName());
				}			
			}
		}
		
		return duplicateColumnNames;
    }
}
