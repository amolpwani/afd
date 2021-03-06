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
import com.ford.afd.service.MasterDataService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MasterDataControllerTest {

	@LocalServerPort
	private int port = 8080;

	private URL base;

	@Autowired
	private TestRestTemplate template;

	@Autowired
	private MasterDataService masterDataService;

	private List<Integer> testEntitiesId = new ArrayList<>();
	
	private final String masterData1Name = "MasterData" + System.nanoTime();
	private final String masterData2Name = "MasterData" + System.nanoTime();

	@Before
	public void setUp() throws Exception {
		MasterData masterData1 = masterDataService.saveMasterData(buildListData(masterData1Name, "description 1"));
		MasterData masterData2 = masterDataService.saveMasterData(buildListData(masterData2Name, "description 2"));
		testEntitiesId.add(masterData1.getId());
		testEntitiesId.add(masterData2.getId());
		this.base = new URL("http://localhost:" + port);
	}

	@After
	public void tearDown() {
		for (Integer listDataId : testEntitiesId) {
			masterDataService.deleteMasterData(masterDataService.findMasterDataById(listDataId));
		}
	}

	private MasterData buildListData(final String name, String description) {
		return new MasterData(name, description, 'Y');
	}

	@Test
	public void shouldRetrieveOneMasterData() throws Exception {
		//Act
		ParameterizedTypeReference<MasterData> returnType = new ParameterizedTypeReference<MasterData>() {
		};
		ResponseEntity<MasterData> actualResponse =  template.exchange(
				base.toString() + "/masterdata/getMasterData/" + testEntitiesId.get(0),
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		MasterData expectedListData = new MasterData(masterData1Name, "description 1", 'Y');
		//expectedListData.setMasterDataItemList(new ArrayList<>());

		expectedListData.setId(testEntitiesId.get(0));
		assertThat(actualResponse.getBody()).isEqualToComparingFieldByField(expectedListData);
	}

	@Test
	public void shouldRetrieveAllMasterData() {
		//Act
		ParameterizedTypeReference<List<MasterData>> returnType = new ParameterizedTypeReference<List<MasterData>>() {
		};

		ResponseEntity<List<MasterData>> actualResponse =  template.exchange(
				base.toString() + "/masterdata/getMasterData",
				HttpMethod.GET,
				null,
				returnType);
		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldUpdateMasterData() throws Exception {
		//Act
		ParameterizedTypeReference<MasterData> returnType = new ParameterizedTypeReference<MasterData>() {
		};

		String masterData1Name = "UpdatedMasterData" + System.nanoTime();
		MasterData updateMasterData = new MasterData(masterData1Name, "updated description 1", 'N');
		updateMasterData.setId(testEntitiesId.get(0));

		ResponseEntity<MasterData> actualResponse =  template.exchange(
				base.toString() + "/masterdata/getMasterData/" + testEntitiesId.get(0),
				HttpMethod.PUT,
				new HttpEntity<MasterData>(updateMasterData, new HttpHeaders()),
				MasterData.class,
				returnType);

		//Assert
		MasterData actualBody = actualResponse.getBody();
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		MasterData expectedMasterData = new MasterData(masterData1Name, "updated description 1", 'N');
		expectedMasterData.setId(testEntitiesId.get(0));
		//expectedMasterData.setMasterDataItemList(new ArrayList<>());
		assertThat(masterDataService.findMasterDataById(actualBody.getId()).getName()).isEqualTo(expectedMasterData.getName());
	}

	@Test
	public void shouldDeleteMasterDataColumnById() {
		//Act
		ParameterizedTypeReference<List<MasterData>> returnType = new ParameterizedTypeReference<List<MasterData>>() {
		};

		template.delete(
				base.toString() + "/masterdata/getMasterData/"+ testEntitiesId.get(0));

		testEntitiesId.remove(testEntitiesId.get(0));

		ResponseEntity<List<MasterData>> actualResponse =  template.exchange(
				base.toString() + "/masterdata/getMasterData",
				HttpMethod.GET,
				null,
				returnType);

		//Assert
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	public void shouldCreateMasterData() throws Exception {
		//Act
		ParameterizedTypeReference<MasterData> returnType = new ParameterizedTypeReference<MasterData>() {
		};

		String masterData1Name = "CreateMasterData" + System.nanoTime();
		MasterData createMasterData = new MasterData(masterData1Name, "description 3", 'N');

		ResponseEntity<MasterData> actualResponse =  template.exchange(
				base.toString() + "/masterdata/getMasterData/",
				HttpMethod.POST,
				new HttpEntity<MasterData>(createMasterData, new HttpHeaders()),
				MasterData.class,
				returnType);

		//Assert
		MasterData actualBody = actualResponse.getBody();
		testEntitiesId.add(actualBody.getId());
		assertThat(actualResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		MasterData expectedMasterData = new MasterData(masterData1Name, "description 3", 'N');
		expectedMasterData.setId(actualBody.getId());
		assertThat(actualBody).isEqualToComparingFieldByField(expectedMasterData);
		assertThat(masterDataService.findMasterDataById(actualBody.getId()).getName()).isEqualTo(expectedMasterData.getName());
	}
}