package com.ford.afd.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.model.FoundationDataRow;
import com.ford.afd.model.MasterDataItem;
import com.ford.afd.service.FoundationDataColumnService;
import com.ford.afd.service.FoundationDataRowService;
import com.ford.afd.service.MasterDataItemService;

@CrossOrigin
@RestController
@RequestMapping("/foundationdatarow")
public class FoundationDataRowController {
    @Autowired
    private FoundationDataRowService foundationDataRowService;
    
    @Autowired
    private FoundationDataColumnService foundationDataColumnService;
    
    @Autowired
    private MasterDataItemService masterDataItemService;

	@RequestMapping(value = "getFoundationDataRow", method = RequestMethod.GET)
	public String directFoundationDataRows() throws JSONException {
		List<Integer> rowIds = foundationDataRowService.allFoundationDataRowIds();
		JSONArray foundationDataRows = new JSONArray();
		
		for (Integer row : rowIds) {
			foundationDataRows.put(geFoundationDataRowObj(row));
		}
		
		return foundationDataRows.toString();
	}

	@RequestMapping(value = "getFoundationDataRow/{rowId}", method = RequestMethod.GET)
	public String foundationDataByRowId(@PathVariable Integer rowId) throws JSONException {
		JSONArray foundationDataRowObj = geFoundationDataRowObj(rowId);
		
		return foundationDataRowObj.toString();
	}

	private JSONArray geFoundationDataRowObj(Integer rowId) throws JSONException {
		List<FoundationDataRow> foundationDataListForRowId = new ArrayList<FoundationDataRow>();
		if (rowId != null) {
			foundationDataListForRowId = foundationDataRowService.findFoundationDataRowByRowId(rowId);
		}
		
		List<FoundationDataColumn> columns = foundationDataColumnService.allFoundationDataColumn();
		Map<String, String> columnIdValueMap = new HashMap<String, String>();
		
		for (FoundationDataRow foundationDataRow : foundationDataListForRowId) {
			columnIdValueMap.put(foundationDataRow.getColumnId() + "", foundationDataRow.getColumnValue());
			columnIdValueMap.put(foundationDataRow.getColumnId() + "_rowId", foundationDataRow.getId() + "");
		}
		
		JSONArray foundationDataColumns = new JSONArray();
		for (FoundationDataColumn column : columns) {
			
			JSONObject foundationDataColumnObj = new JSONObject();
			foundationDataColumnObj.put("uiColumnName", column.getUiColumnName());
			foundationDataColumnObj.put("hoverHelp", column.getHoverHelp());
			foundationDataColumnObj.put("inputType", column.getInputType());
			foundationDataColumnObj.put("value", column.getValue());
			foundationDataColumnObj.put("uniqueColumn", column.getUniqueColumn() + "");
			foundationDataColumnObj.put("mandatory", column.getMandatory() + "");
			foundationDataColumnObj.put("sortOrder", column.getSortOrder());
			foundationDataColumnObj.put("editable", column.getEditable() + "");
			foundationDataColumnObj.put("length", column.getLength());
			foundationDataColumnObj.put("selectedListId", column.getSelectedListId());
			foundationDataColumnObj.put("listDisplayType", column.getListDisplayType());
			foundationDataColumnObj.put("columnValue", columnIdValueMap.get(column.getId() + ""));
			foundationDataColumnObj.put("columnId", column.getId());
			foundationDataColumnObj.put("rowId", rowId);
			foundationDataColumnObj.put("id", columnIdValueMap.get(column.getId()+ "_rowId"));
			
			if ("List".equals(column.getInputType())) {
				List<MasterDataItem> masterDataItems = masterDataItemService.findMasterDataItemByMasterDataId(column.getSelectedListId());
				JSONArray masterDataItemsArr = new JSONArray();
				for (MasterDataItem item : masterDataItems) {
					if ('Y' == item.getActive()) {
						JSONObject masterDataItemObj = new JSONObject();
						masterDataItemObj.put("code", item.getCode());
						masterDataItemObj.put("description", item.getDescription());
						masterDataItemObj.put("id", item.getId());
						masterDataItemsArr.put(masterDataItemObj);
					}
				}
				
				foundationDataColumnObj.put("masterDataItems", masterDataItemsArr);
			}
			
			foundationDataColumns.put(foundationDataColumnObj);
		}
		
		return foundationDataColumns;
	}

	@RequestMapping(value = "getFoundationDataRow/{id}", method = RequestMethod.PUT)
	public List<String> updateFoundationDataRow(@PathVariable Integer id, @RequestBody List<FoundationDataRow> foundationDataRowList) {
		
		List<String> columNamesHavingDuplicateValues = new ArrayList<String>();
		columNamesHavingDuplicateValues = foundationDataRowService.getColumnNamesHavingDuplicateValues(foundationDataRowList, true);
		
		if (columNamesHavingDuplicateValues.size() == 0) {
			for (FoundationDataRow foundationDataRow : foundationDataRowList) {		
				foundationDataRowService.saveFoundationDataRow(foundationDataRow);
			}
		}
		
		return columNamesHavingDuplicateValues;
	}

	@RequestMapping(value = "getFoundationDataRow/{rowId}",method = RequestMethod.DELETE)
	public void deleteFoundationDataRowByRowId(@PathVariable int rowId ){
		foundationDataRowService.deleteFoundationDataRowByRowId(rowId);
	}

	@RequestMapping(value = "getFoundationDataRow", method = RequestMethod.POST)
	public List<String> createFoundationDataRow(@RequestBody List<FoundationDataRow> foundationDataRowList) {
		
		List<String> columNamesHavingDuplicateValues = new ArrayList<String>();
		columNamesHavingDuplicateValues = foundationDataRowService.getColumnNamesHavingDuplicateValues(foundationDataRowList, false);
		
		if (columNamesHavingDuplicateValues.size() == 0) {
			Integer rowId = foundationDataRowService.findNewRowId();
			for (FoundationDataRow foundationDataRow : foundationDataRowList) {	
				foundationDataRow.setRowId(rowId);
				foundationDataRowService.saveFoundationDataRow(foundationDataRow);
			}
		}
		
		return columNamesHavingDuplicateValues;
	}
}
