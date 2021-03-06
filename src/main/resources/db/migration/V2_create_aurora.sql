CREATE TABLE TAFD001_MASTER_DATA (
   TAFD001_MSTR_DATA_D  	INT                  NOT NULL,
   TAFD001_MSTR_DATA_N  	VARCHAR(100)         NOT NULL,
   TAFD001_MSTR_DATA_X  	VARCHAR(255)         NULL,
   TAFD001_MSTR_DATA_ACTV_F CHAR(1)              NULL,
   TAFD001_CREATE_USER_C 			VARCHAR(8)           NULL,
   TAFD001_CREATE_S     			DATETIME             NULL,
   TAFD001_LAST_UPDT_USER_C 		VARCHAR(8)           NULL,
   TAFD001_LAST_UPDT_S  			DATETIME             NULL,
   CONSTRAINT TAFD0011 PRIMARY KEY (TAFD001_MSTR_DATA_D)
)

CREATE TABLE TAFD002_MASTER_DATA_ITEM (
   TAFD002_MSTR_DATA_ITEM_D 		INT                  NOT NULL,
   TAFD001_MSTR_DATA_D 				INT                  NULL,
   TAFD002_MSTR_DATA_ITEM_N 		VARCHAR(100)         NULL,
   TAFD002_MSTR_DATA_ITEM_X N		VARCHAR(900)         NULL,
   TAFD002_MSTR_DATA_ITEM_ACTV_F 	CHAR(1)              NULL,
   TAFD002_CREATE_USER_C 					VARCHAR(8)           NULL,
   TAFD002_CREATE_S     					DATETIME             NULL,
   TAFD002_LAST_UPDT_USER_C 				VARCHAR(8)           NULL,
   TAFD002_LAST_UPDT_S 						DATETIME             NULL,
   CONSTRAINT TAFD0021 PRIMARY KEY (TAFD002_MSTR_DATA_ITEM_D)
)

CREATE TABLE TADF005_FOUNDATION_DATA_CLMN (
   TADF005_CLMN_D       		INT                  NOT NULL,
   TADF005_SELECTED_LIST_ID 	INT              	 NOT NULL,
   TADF005_LIST_DISPLAY_TYPE	VARCHAR(100)   		 NULL,
   TADF005_INPUT_TYPE   		VARCHAR(100)         NULL,
   TADF005_CLMN_N       		VARCHAR(100)         NULL,
   TADF005_CLMN_CMT     		VARCHAR(350)         NULL,
   TADF005_UNIQUE_F    			CHAR(1)              NOT NULL DEFAULT 'N',
   TADF005_MANDATORY_F  		CHAR(1)              NOT NULL DEFAULT 'N',
   TADF005_EDITABLE_F   		CHAR(1)              NOT NULL DEFAULT 'N',
   TADF005_VAL          		VARCHAR(250)         NULL,
   TADF005_SORT_ORDER   		INT                  NOT NULL,
   TADF005_LNTH         		INT                  NULL,
   TADF005_CREATE_USER_C 				VARCHAR(8)           NOT NULL,
   TADF005_CREATE_S     				DATETIME             NOT NULL,
   TADF005_LAST_UPDT_USER_C 			VARCHAR(8)       	 NOT NULL,
   TADF005_LAST_UPDT_S  				DATETIME             NOT NULL,
   CONSTRAINT TADF0051 PRIMARY KEY (TADF005_CLMN_D)
)

CREATE TABLE TAFD004_FOUNDATION_DATA (
   TAFD004_FDN_DATA_D   		INT                  NOT NULL,
   TAFD004_FDN_DATA_ROW_D       INT                  NOT NULL,
   TAFD004_FDN_DATA_COL_D  		INT                  NOT NULL,
   TAFD004_FDN_DATA_COL_V   	VARCHAR(500)         NULL,
   TAFD004_CREATE_USER_C 				VARCHAR(8)           NOT NULL,
   TAFD004_CREATE_S     				DATETIME             NOT NULL,
   TAFD004_LAST_UPDT_USER_C 			VARCHAR(8)           NOT NULL,
   TAFD004_LAST_UPDT_S  				DATETIME             NOT NULL,
   CONSTRAINT TAFD004 PRIMARY KEY (TAFD004_FDN_DATA_D)
)