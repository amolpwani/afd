package com.ford.afd.repository;

import com.ford.afd.model.MasterData;
import com.ford.afd.repository.MasterDataRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;


/**
 * Created by dudekula.abedin on 1/8/2018.
 */

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
public class MasterDataRepositoryTest {
	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private MasterDataRepository masterDataRepository;
	
	@Test
	public void directMasterData() {
		String masterData1Name = "MasterData" + System.nanoTime();
		MasterData masterData1 = new MasterData();
		masterData1.setName(masterData1Name);
		masterData1.setActive(true);
		entityManager.persist(masterData1);
		entityManager.flush();
		MasterData masterData2 = new MasterData();
		masterData2.setName("JunitTesting1");
		masterData2.setActive(true);
		entityManager.persist(masterData2);
		entityManager.flush();
		//given
		List<MasterData> masterDatas = masterDataRepository.findAll();
		for (MasterData masterData : masterDatas) {
			if (masterData.getName().equals(masterData1.getName())) {
				//then
				MasterData masterDatatemp=masterDataRepository.findOne(masterData.getId());
				assertThat(masterDatatemp.getName()).isEqualTo(masterData1.getName());
			} else if(masterData.getName().equals(masterData2.getName())) {
				//then
				MasterData masterDatatemp=masterDataRepository.findOne(masterData.getId());
				assertThat(masterDatatemp.getName()).isEqualTo(masterData2.getName());
			}
		}
	}

	@Test
	public void masterDataById() {
		String masterData1Name = "MasterData" + System.nanoTime();
		MasterData masterData1 = new MasterData();
		masterData1.setName(masterData1Name);
		masterData1.setActive(true);
		entityManager.persist(masterData1);
		entityManager.flush();
		
		List<MasterData> masterDatas = masterDataRepository.findAll();
		for (MasterData masterData : masterDatas) {
			if(masterData.getName().equals(masterData1.getName())) {
				//then
				MasterData masterDatatemp=masterDataRepository.findOne(masterData.getId());
				assertThat(masterDatatemp.getName()).isEqualTo(masterData1.getName());
			}
		}
	}
	
	@Test
	public void updateMasterData() {
		String masterData1Name = "MasterData" + System.nanoTime();
		MasterData masterData1 = new MasterData();
		masterData1.setName(masterData1Name);
		masterData1.setActive(true);
		entityManager.persist(masterData1);
		entityManager.flush();

		List<MasterData> masterDatas = masterDataRepository.findAll();
		for (MasterData masterData : masterDatas) {
			if (masterData.getName().equals(masterData1.getName())) {
				//then
				MasterData masterDatatemp=masterDataRepository.findOne(masterData.getId());
				MasterData masterData2 = new MasterData();
				masterData2.setName("JunitTestingupadeted");
				masterData2.setActive(true);
				BeanUtils.copyProperties(masterData2, masterDatas);
				assertThat(masterDatatemp.getName()).isEqualTo(masterData1.getName());
			}
		}
	}
	
	@Test
	public void deleteListDataById() {
		String masterData1Name = "MasterData" + System.nanoTime();
		MasterData masterData1 = new MasterData();
		masterData1.setName(masterData1Name);
		masterData1.setActive(true);
		entityManager.persist(masterData1);
		entityManager.flush();
		List<MasterData> masterDatas = masterDataRepository.findAll();
		
		for (MasterData masterData : masterDatas) {
			if (masterData.getName().equals(masterData1.getName())) {
				//then
				MasterData masterDatatemp = masterDataRepository.findOne(masterData.getId());
				masterDataRepository.delete(masterData);
				assertThat(masterDatatemp.getName()).isEqualTo(masterData1.getName());
			}
		}
	}
	
	@Test
	public void createMasterData() {
		String masterData1Name = "MasterData" + System.nanoTime();
		MasterData masterData1 = new MasterData();
		masterData1.setName(masterData1Name);
		masterData1.setActive(true);
		entityManager.persist(masterData1);
		entityManager.flush();
		List<MasterData> masterDatas = masterDataRepository.findAll();
		
		for (MasterData masterData : masterDatas) {
			if(masterData.getName().equals(masterData1.getName())) {
				//then
				MasterData masterDatatemp = masterDataRepository.findOne(masterData.getId());
				assertThat(masterDatatemp.getName()).isEqualTo(masterData1.getName());
			}
		}
	}
}
