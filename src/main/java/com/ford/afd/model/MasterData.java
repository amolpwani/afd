package com.ford.afd.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "TAFD001_MASTER_DATA")
@EntityListeners(AuditingEntityListener.class)
public class MasterData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TAFD001_MSTR_DATA_D")
    private int id;
    
    @Column(name = "TAFD001_MSTR_DATA_N")
    private String name;
    
    @Column(name = "TAFD001_MSTR_DATA_X")
    private String description;
    
    @Column(name = "TAFD001_MSTR_DATA_ACTV_F")
    private boolean active;
    
    @CreatedBy
    @Column(name = "TADF001_CREATE_USER_C", updatable =  false)
    protected String createdBy;
    
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TADF001_CREATE_S", updatable =  false)
    protected Date creationDate;
    
    @LastModifiedBy
    @Column(name = "TADF001_LAST_UPDT_USER_C")
    protected String lastModifiedBy;
    
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "TADF001_LAST_UPDT_S")
    protected Date lastModifiedDate;
    
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "masterData", cascade = CascadeType.ALL)
//    private List<MasterDataItem> masterDataItemList;

    public MasterData(String name, String description, boolean active) {
        this.name = name;
        this.description = description;
        this.active = active;
    }

    public MasterData() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

//	public List<MasterDataItem> getMasterDataItemList() {
//		return masterDataItemList;
//	}
//
//	public void setMasterDataItemList(List<MasterDataItem> masterDataItemList) {
//		this.masterDataItemList = masterDataItemList;
//	}
}

