package com.ford.afd.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.ford.afd.model.MasterData;
import com.ford.afd.model.MasterDataItem;
import com.ford.afd.service.MasterDataItemService;
import com.ford.afd.service.MasterDataService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MasterDataItemControllerTest {

	@LocalServerPort
	private int port = 8080;

	private URL base;

	@Autowired
	private TestRestTemplate template;

	@Autowired
	private MasterDataItemService masterDataItemService;
	
	@Autowired
	private MasterDataService masterDataService;

	private List<Long> testEntitiesId = new ArrayList<>();
	
	private MasterData masterData;

	@Before
	public void setUp() throws Exception {
		MasterData listData = getMasterData();
		masterData = masterDataService.saveMasterData(listData);
		
		MasterDataItem listDataItem1 = masterDataItemService.saveMasterDataItem(buildListDataItem("BU1", "description 1", masterData.getId(), listData));
		MasterDataItem listDataItem2 = masterDataItemService.saveMasterDataItem(buildListDataItem("BU2", "description 2", masterData.getId(), listData));
		
		testEntitiesId.add(listDataItem1.getId());
		testEntitiesId.add(listDataItem2.getId());
		this.base = new URL("http://localhost:" + port);
	}

	private MasterData getMasterData() {
		MasterData listData = new MasterData("List1", "Description1", true);
		return listData;
	}

	@After
	public void tearDown() {
		for (Long listDataId : testEntitiesId) {
			masterDataItemService.deleteMasterDataItem(masterDataItemService.findMasterDataItemById(listDataId));
		}
	}

	private MasterDataItem buildListDataItem(String code, String description, long listId, MasterData item) {
		MasterDataItem masterDataItem = new MasterDataItem(code, description, true, listId);
		return masterDataItem;
	}

	@Test
	public void shouldRetrieveOneListDataItem() throws Exception {
		//Act
		ParameterizedTypeReference<MasterDataItem> returnType = new ParameterizedTypeReference<MasterDataItem>() {
		};
		ResponseEntity<MasterDataItem> actualResponse =  template.exchange(
				base.toString() + "/masterdataitem/getMasterDataItem/" + testEntitiesId.get(0),
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		MasterDataItem expectedListData = new MasterDataItem("BU1", "description 1", true, masterData.getId());

		expectedListData.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldRetrieveAllListData() {
		//Act
		ParameterizedTypeReference<List<MasterDataItem>> returnType = new ParameterizedTypeReference<List<MasterDataItem>>() {
		};

		ResponseEntity<List<MasterDataItem>> actualResponse =  template.exchange(
				base.toString() + "/masterdataitem/getMasterDataItem",
				HttpMethod.GET,
				null,
				returnType);
		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldUpdateListData() throws Exception {
		//Act
		ParameterizedTypeReference<MasterDataItem> returnType = new ParameterizedTypeReference<MasterDataItem>() {
		};

		MasterDataItem updateListDataItem = new MasterDataItem("BU2", "updated description 1", false, masterData.getId());
		updateListDataItem.setId(testEntitiesId.get(0));

		ResponseEntity<MasterDataItem> actualResponse =  template.exchange(
				base.toString() + "/masterdataitem/getMasterDataItem/" + testEntitiesId.get(0),
				HttpMethod.PUT,
				new HttpEntity<MasterDataItem>(updateListDataItem, new HttpHeaders()),
				MasterDataItem.class,
				returnType);

		//Assert
		MasterDataItem actualBody = actualResponse.getBody();
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		MasterDataItem expectedListData = new MasterDataItem("BU2", "updated description 1", false, 100);
		expectedListData.setId(testEntitiesId.get(0));
		
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
		assertThat(masterDataItemService.findMasterDataItemById(actualBody.getId())).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldDeleteListById() {
		//Act
		ParameterizedTypeReference<List<MasterDataItem>> returnType = new ParameterizedTypeReference<List<MasterDataItem>>() {
		};

		template.delete(
				base.toString() + "/masterdataitem/getMasterDataItem/"+ testEntitiesId.get(0));

		testEntitiesId.remove(testEntitiesId.get(0));

		ResponseEntity<List<MasterDataItem>> actualResponse =  template.exchange(
				base.toString() + "/masterdataitem/getMasterDataItem",
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldCreateListData() throws Exception {
		//Act
		ParameterizedTypeReference<MasterDataItem> returnType = new ParameterizedTypeReference<MasterDataItem>() {
		};

		MasterDataItem createListData = new MasterDataItem("BU3", "description 3", false, masterData.getId());

		ResponseEntity<MasterDataItem> actualResponse =  template.exchange(
				base.toString() + "/masterdataitem/getMasterDataItem",
				HttpMethod.POST,
				new HttpEntity<MasterDataItem>(createListData, new HttpHeaders()),
				MasterDataItem.class,
				returnType);

		//Assert
		MasterDataItem actualBody = actualResponse.getBody();
		testEntitiesId.add(actualBody.getId());
		
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		MasterDataItem expectedListData = new MasterDataItem("BU3", "description 3", false, masterData.getId());
		expectedListData.setId(actualBody.getId());
		
		assertThat(actualBody).isEqualToComparingFieldByField(expectedListData);
		assertThat(masterDataItemService.findMasterDataItemById(actualBody.getId())).isEqualToComparingFieldByField(expectedListData);
	}
}