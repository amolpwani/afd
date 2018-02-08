package com.ford.afd.controller;


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
import com.ford.afd.service.FoundationDataColumnService;
import com.ford.afd.service.FoundationDataRowService;

@CrossOrigin
@RestController
@RequestMapping("/foundationdatarow")
public class FoundationDataRowController {
    @Autowired
    private FoundationDataRowService foundationDataRowService;
    
    @Autowired
    private FoundationDataColumnService foundationDataColumnService;

	@RequestMapping(value = "getFoundationDataRow",method = RequestMethod.GET)
	public String directFoundationDataRows() throws JSONException {
		List<Long> rowIds = foundationDataRowService.allFoundationDataRowIds();
		JSONArray foundationDataRows = new JSONArray();
		
		for (Long row : rowIds) {
			foundationDataRows.put(geFoundationDataRowObj(row));
		}
		
		return foundationDataRows.toString();
	}

	@RequestMapping(value = "getFoundationDataRow/{rowId}",method = RequestMethod.GET)
	public String foundationDataByRowId(@PathVariable long rowId) throws JSONException {
		JSONObject foundationDataRowObj = geFoundationDataRowObj(rowId);
		
		return foundationDataRowObj.toString();
	}

	private JSONObject geFoundationDataRowObj(long rowId) throws JSONException {
		List<FoundationDataRow> foundartionDataListForRowId = foundationDataRowService.findFoundationDataRowByRowId(rowId);
		List<FoundationDataColumn> columns = foundationDataColumnService.allFoundationDataColumn();
		
		Map<Long, FoundationDataColumn> columnMap = new HashMap<Long, FoundationDataColumn>();
		for (FoundationDataColumn column : columns) {
			columnMap.put(column.getId(), column);
		}
		
		JSONArray foundationDataColumns = new JSONArray();
		for (FoundationDataRow data : foundartionDataListForRowId) {
			if (columnMap.containsKey(data.getColumnId())) {
				FoundationDataColumn column = columnMap.get(data.getColumnId());
				
				JSONObject foundationDataColumnObj = new JSONObject();
				foundationDataColumnObj.put(column.getUiColumnName(), data.getColumnValue());
				foundationDataColumnObj.put("hoverHelp", column.getHoverHelp());
				foundationDataColumnObj.put("inputType", column.getInputType());
				foundationDataColumnObj.put("value", column.getValue());
				foundationDataColumnObj.put("uniqueColumn", column.isUniqueColumn());
				foundationDataColumnObj.put("mandatory", column.isMandatory());
				foundationDataColumnObj.put("sortOrder", column.getSortOrder());
				foundationDataColumnObj.put("editable", column.isEditable());
				foundationDataColumnObj.put("length", column.getLength());
				foundationDataColumnObj.put("selectedListId", column.getSelectedListId());
				foundationDataColumnObj.put("listDisplayType", column.getListDisplayType());
				foundationDataColumnObj.put("columnValue", data.getColumnValue());
				
				foundationDataColumns.put(foundationDataColumnObj);
			}
		}
		
		JSONObject foundationDataRowObj1 = new JSONObject();
		foundationDataRowObj1.put(rowId + "", foundationDataColumns);
		
		return foundationDataRowObj1;
	}

	@RequestMapping(value="getFoundationDataRow/{id}",method=RequestMethod.PUT)
	public void updateFoundationDataRow(@PathVariable long id, @RequestBody List<FoundationDataRow> foundationDataRowList){
		for (FoundationDataRow foundationDataRow : foundationDataRowList) {		
			foundationDataRowService.saveFoundationDataRow(foundationDataRow);
		}
	}

	@RequestMapping(value = "getFoundationDataRow/{rowId}",method = RequestMethod.DELETE)
	public void deleteFoundationDataRowByRowId(@PathVariable long rowId ){
		foundationDataRowService.deleteFoundationDataRowByRowId(rowId);
	}

	@RequestMapping(value="getFoundationDataRow",method=RequestMethod.POST)
	public void createFoundationDataRow(@RequestBody List<FoundationDataRow> foundationDataRowList) {
		Long rowId = foundationDataRowService.findNewRowId();
		for (FoundationDataRow foundationDataRow : foundationDataRowList) {	
			foundationDataRow.setRowId(rowId);
			foundationDataRowService.saveFoundationDataRow(foundationDataRow);
		}
	}
}
