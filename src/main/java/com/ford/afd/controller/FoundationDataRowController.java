package com.ford.afd.controller;


import java.util.List;

//import org.json.JSONException;
//import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.FoundationDataRow;
import com.ford.afd.service.FoundationDataColumnService;
import com.ford.afd.service.FoundationDataRowService;

@CrossOrigin
@RestController
@RequestMapping("/foundationdatarow")
public class FoundationDataRowController {
    @Autowired
    private FoundationDataRowService foundationDataService;
    
    @Autowired
    private FoundationDataColumnService foundationDataColumnService;

	@RequestMapping(value = "getFoundationDataRow",method = RequestMethod.GET)
	public List<FoundationDataRow> directList(){
		return foundationDataService.allFoundationDataRow();
	}

//	@RequestMapping(value = "getFoundationDataRow/{rowId}",method = RequestMethod.GET)
//	public String foundationDataByRowId(@PathVariable long rowId ) throws JSONException {
//		
//		List<FoundationDataRow> foundartionDataListForRowId = foundationDataService.findFoundationDataRowByRowId(rowId);
//		List<FoundationDataColumn> columns = foundationDataColumnService.allFoundationDataColumn();
//		
//		Map<Long, FoundationDataColumn> columnMap = new HashMap<Long, FoundationDataColumn>();
//		for (FoundationDataColumn column : columns) {
//			columnMap.put(column.getId(), column);
//		}
//		
//		JSONObject foundationDataRowObj = new JSONObject();
//		for (FoundationDataRow data : foundartionDataListForRowId) {
//			if (columnMap.containsKey(data.getColumnId())) {
//				FoundationDataColumn column = columnMap.get(data.getColumnId());
//				foundationDataRowObj.put(column.getUiColumnName(), data.getColumnValue());
//				foundationDataRowObj.put("hoverHelp", column.getHoverHelp());
//				foundationDataRowObj.put("inputType", column.getInputType());
//				foundationDataRowObj.put("value", column.getValue());
//			}
//		} 
//		
//		return foundationDataRowObj.toString();
//	}

	@RequestMapping(value="getFoundationDataRow/{id}",method=RequestMethod.PUT)
	public void updateFoundationDataRow(@PathVariable long id, @RequestBody List<FoundationDataRow> foundationDataList){
		for (FoundationDataRow foundationData : foundationDataList) {		
			foundationDataService.saveFoundationDataRow(foundationData);
		}
	}

	@RequestMapping(value = "getFoundationDataRow/{rowId}",method = RequestMethod.DELETE)
	public void deleteFoundationDataRowByRowId(@PathVariable long rowId ){
		foundationDataService.deleteFoundationDataRowByRowId(rowId);
	}

	@RequestMapping(value="getFoundationDataRow",method=RequestMethod.POST)
	public void createFoundationDataRow(@RequestBody List<FoundationDataRow> foundationDataList) {
		for (FoundationDataRow foundationData : foundationDataList) {		
			foundationDataService.saveFoundationDataRow(foundationData);
		}
	}
}
