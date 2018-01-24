package com.ford.afd.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import org.json.JSONException;
//import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ford.afd.model.FoundationData;
import com.ford.afd.model.FoundationDataColumn;
import com.ford.afd.service.FoundationDataColumnService;
import com.ford.afd.service.FoundationDataService;


/**
 * Created by dchiruma on 12/26/2017.
 */

@RestController
@RequestMapping("/foundationdata")
public class FoundationDataController {
    @Autowired
    private FoundationDataService foundationDataService;
    
    @Autowired
    private FoundationDataColumnService foundationDataColumnService;

	@RequestMapping(value = "getFoundationData",method = RequestMethod.GET)
	public List<FoundationData> directList(){
		return foundationDataService.allFoundationData();
	}

//	@RequestMapping(value = "getFoundationData/{rowId}",method = RequestMethod.GET)
//	public String foundationDataByRowId(@PathVariable long rowId ) throws JSONException {
//		
//		List<FoundationData> foundartionDataListForRowId = foundationDataService.findFoundationDataByRowId(rowId);
//		List<FoundationDataColumn> columns = foundationDataColumnService.allFoundationDataColumn();
//		
//		Map<Long, FoundationDataColumn> columnMap = new HashMap<Long, FoundationDataColumn>();
//		for (FoundationDataColumn column : columns) {
//			columnMap.put(column.getId(), column);
//		}
//		
//		JSONObject foundationDataRowObj = new JSONObject();
//		for (FoundationData data : foundartionDataListForRowId) {
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

	@RequestMapping(value="getFoundationData/{id}",method=RequestMethod.PUT)
	public void updateFoundationData(@PathVariable long id, @RequestBody List<FoundationData> foundationDataList){
		for (FoundationData foundationData : foundationDataList) {		
			foundationDataService.saveFoundationData(foundationData);
		}
	}

	@RequestMapping(value = "getFoundationData/{rowId}",method = RequestMethod.DELETE)
	public void deleteFoundationDataByRowId(@PathVariable long rowId ){
		foundationDataService.deleteFoundationDataByRowId(rowId);
	}

	@RequestMapping(value="getFoundationData",method=RequestMethod.POST)
	public void createFoundationDataRow(@RequestBody List<FoundationData> foundationDataList) {
		for (FoundationData foundationData : foundationDataList) {		
			foundationDataService.saveFoundationData(foundationData);
		}
	}
}
