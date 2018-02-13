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

import com.ford.afd.model.MasterDataItem;
import com.ford.afd.service.MasterDataItemService;

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

	private List<Integer> testEntitiesId = new ArrayList<>();
	
	private final String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
	private final String masterDataItem2Code = "MasterDataItem" + System.nanoTime();
	
	@Before
	public void setUp() throws Exception {
		MasterDataItem listDataItem1 = masterDataItemService.saveMasterDataItem(buildListDataItem(masterDataItem1Code, "description 1", 100));
		MasterDataItem listDataItem2 = masterDataItemService.saveMasterDataItem(buildListDataItem(masterDataItem2Code, "description 2", 100));
		
		testEntitiesId.add(listDataItem1.getId());
		testEntitiesId.add(listDataItem2.getId());
		this.base = new URL("http://localhost:" + port);
	}

	@After
	public void tearDown() {
		for (Integer listDataId : testEntitiesId) {
			masterDataItemService.deleteMasterDataItem(masterDataItemService.findMasterDataItemById(listDataId));
		}
	}

	private MasterDataItem buildListDataItem(String code, String description, Integer listId) {
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
		MasterDataItem expectedMasterDataItem = new MasterDataItem(masterDataItem1Code, "description 1", true, 100);

		expectedMasterDataItem.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedMasterDataItem);
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

		String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
		MasterDataItem updateListDataItem = new MasterDataItem(masterDataItem1Code, "updated description 1", false, 100);

		ResponseEntity<MasterDataItem> actualResponse =  template.exchange(
				base.toString() + "/masterdataitem/getMasterDataItem/" + testEntitiesId.get(0),
				HttpMethod.PUT,
				new HttpEntity<MasterDataItem>(updateListDataItem, new HttpHeaders()),
				MasterDataItem.class,
				returnType);

		//Assert
		MasterDataItem actualBody = actualResponse.getBody();
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		
		MasterDataItem expectedListData = new MasterDataItem(masterDataItem1Code, "updated description 1", false, 100);
		expectedListData.setId(actualBody.getId());
		
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
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

		String masterDataItem1Code = "MasterDataItem" + System.nanoTime();
		MasterDataItem createListData = new MasterDataItem(masterDataItem1Code, "description 3", false, 100);

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
		MasterDataItem expectedListData = new MasterDataItem(masterDataItem1Code, "description 3", false, 100);
		expectedListData.setId(actualBody.getId());
		
		assertThat(actualBody).isEqualToComparingFieldByField(expectedListData);
	}
}