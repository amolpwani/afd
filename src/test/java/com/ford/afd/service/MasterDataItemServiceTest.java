package com.ford.afd.service;

import com.ford.afd.model.MasterDataItem;
import com.ford.afd.repository.MasterDataItemRepository;
import com.ford.afd.service.MasterDataItemService;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class MasterDataItemServiceTest {

	@InjectMocks
	private MasterDataItemService masterDataItemService;

	@Mock
	private MasterDataItemRepository masterDataItemRepositoryMock;

	@Test
	public void allMasterDataItem_shouldReturnEmptyWhenNoListDataFound() {
		//Arrange
		when(masterDataItemRepositoryMock.findAll()).thenReturn(Lists.emptyList());
		//Act
		List<MasterDataItem> actualResult = masterDataItemService.allMasterDataItems();
		//Assert
		assertThat(actualResult).hasSize(0);
	}

	@Test
	public void allMasterDataItem_shouldReturnValuesWhenListDataFound() {
		//Arrange
		List<MasterDataItem> masterDataItem = new ArrayList<>(1);
		String masterData1Name = "MasterData" + System.nanoTime();
		masterDataItem.add(buildMasterDataItem(masterData1Name));
		when(masterDataItemRepositoryMock.findAll()).thenReturn(masterDataItem);
		//Act
		List<MasterDataItem> actualResult = masterDataItemService.allMasterDataItems();
		//Assert
		assertThat(actualResult).isEqualTo(masterDataItem);
	}

	@Test
	public void saveMasterDataItem_shouldSaveAListData() {
		//Arrange
		String masterData1Name = "MasterData" + System.nanoTime();
		ArgumentCaptor<MasterDataItem> masterDataItemCaptor = ArgumentCaptor.forClass(MasterDataItem.class);
		when(masterDataItemRepositoryMock.save(masterDataItemCaptor.capture()))
		.thenReturn(buildMasterDataItem(masterData1Name));
		//Act
		masterDataItemService.saveMasterDataItem(buildMasterDataItem(masterData1Name));

		MasterDataItem expectedEntity = buildMasterDataItem(masterData1Name);
		expectedEntity.setId(1);
		//Assert
		assertThat(masterDataItemCaptor.getValue()).isEqualToComparingFieldByField(expectedEntity);
	}

	@Test
	public void deleteListDataById_shouldInvokeDeleteOnRepository() {
		//Arrange
		ArgumentCaptor<MasterDataItem> masterDataItemCaptor = ArgumentCaptor.forClass(MasterDataItem.class);
		doNothing().when(masterDataItemRepositoryMock).delete(masterDataItemCaptor.capture());
		//Act
		String masterData1Name = "MasterData" + System.nanoTime();
		masterDataItemService.deleteMasterDataItem(buildMasterDataItem(masterData1Name));
		//Assert
		assertThat(masterDataItemCaptor.equals(masterDataItemCaptor));
	}

	@Test
	public void allMasterDataItem_shouldRetrieveAllListData() {
		//Arrange
		List<MasterDataItem> masterDataItems = new ArrayList<>(1);
		String masterData1Name = "MasterData" + System.nanoTime();
		masterDataItems.add(buildMasterDataItem(masterData1Name));
		when(masterDataItemRepositoryMock.findAll()).thenReturn(masterDataItems);
		//Act
		List<MasterDataItem> actualMasterDataItems = masterDataItemService.allMasterDataItems();
		//Assert
		assertThat(actualMasterDataItems).isNotNull();
		assertThat(actualMasterDataItems).hasSize(1);
		assertThat(actualMasterDataItems.get(0).getDescription()).isEqualTo("TestingBusiness");
	}

	private MasterDataItem buildMasterDataItem(String code) {
		MasterDataItem entity = new MasterDataItem(code, "TestingBusiness", 'Y', 1 );
		entity.setId(1);
		return entity;
	}
}