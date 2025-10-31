-- Sample SQL Queries for Siebel Training
-- These queries are for learning purposes and should be run in a development environment

-- ========================================
-- Basic Queries
-- ========================================

-- Query 1: Retrieve all accounts
SELECT 
    ROW_ID,
    NAME,
    LOC,
    TYPE_CD,
    STATUS_CD,
    CREATED,
    LAST_UPD
FROM S_ORG_EXT
WHERE DB_LAST_UPD > SYSDATE - 30
ORDER BY NAME;

-- Query 2: Count accounts by type
SELECT 
    TYPE_CD,
    COUNT(*) as ACCOUNT_COUNT
FROM S_ORG_EXT
WHERE DB_LAST_UPD IS NOT NULL
GROUP BY TYPE_CD
ORDER BY ACCOUNT_COUNT DESC;

-- Query 3: Retrieve contacts with their accounts
SELECT 
    c.ROW_ID as CONTACT_ID,
    c.FIRST_NAME,
    c.LAST_NAME,
    c.EMAIL_ADDR,
    a.NAME as ACCOUNT_NAME,
    a.LOC as ACCOUNT_LOCATION
FROM S_CONTACT c
INNER JOIN S_ORG_EXT a ON c.PR_DEPT_OU_ID = a.ROW_ID
WHERE c.DB_LAST_UPD > SYSDATE - 30
ORDER BY a.NAME, c.LAST_NAME;

-- ========================================
-- Advanced Queries
-- ========================================

-- Query 4: Opportunities with account information
SELECT 
    o.ROW_ID as OPPORTUNITY_ID,
    o.NAME as OPPORTUNITY_NAME,
    o.SALES_STAGE_CD,
    o.PR_CLOSE_DT,
    o.REVENUE,
    a.NAME as ACCOUNT_NAME,
    c.FIRST_NAME || ' ' || c.LAST_NAME as OWNER_NAME
FROM S_OPTY o
LEFT JOIN S_ORG_EXT a ON o.TARGET_OU_ID = a.ROW_ID
LEFT JOIN S_CONTACT c ON o.OWNER_PER_ID = c.ROW_ID
WHERE o.REVENUE > 10000
ORDER BY o.REVENUE DESC;

-- Query 5: Count opportunities by stage
SELECT 
    SALES_STAGE_CD,
    COUNT(*) as OPP_COUNT,
    SUM(REVENUE) as TOTAL_REVENUE,
    AVG(REVENUE) as AVG_REVENUE
FROM S_OPTY
WHERE SALES_STAGE_CD IS NOT NULL
GROUP BY SALES_STAGE_CD
ORDER BY TOTAL_REVENUE DESC;

-- Query 6: Activities associated with accounts
SELECT 
    act.ROW_ID as ACTIVITY_ID,
    act.NAME as ACTIVITY_NAME,
    act.TYPE_CD as ACTIVITY_TYPE,
    act.APPT_RQST_START_DT as START_DATE,
    a.NAME as ACCOUNT_NAME
FROM S_EVT_ACT act
INNER JOIN S_ORG_EXT a ON act.TARGET_OU_ID = a.ROW_ID
WHERE act.APPT_RQST_START_DT > SYSDATE
ORDER BY act.APPT_RQST_START_DT;

-- ========================================
-- Data Model Exploration
-- ========================================

-- Query 7: Find all tables starting with S_
SELECT TABLE_NAME
FROM USER_TABLES
WHERE TABLE_NAME LIKE 'S_%'
ORDER BY TABLE_NAME;

-- Query 8: Get column information for a specific table
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    DATA_LENGTH,
    NULLABLE
FROM USER_TAB_COLUMNS
WHERE TABLE_NAME = 'S_ORG_EXT'
ORDER BY COLUMN_ID;

-- Query 9: Identify foreign key relationships
SELECT 
    a.CONSTRAINT_NAME,
    a.TABLE_NAME,
    a.COLUMN_NAME,
    c_pk.TABLE_NAME as REFERENCES_TABLE,
    b.COLUMN_NAME as REFERENCES_COLUMN
FROM USER_CONS_COLUMNS a
JOIN USER_CONSTRAINTS c ON a.CONSTRAINT_NAME = c.CONSTRAINT_NAME
JOIN USER_CONSTRAINTS c_pk ON c.R_CONSTRAINT_NAME = c_pk.CONSTRAINT_NAME
JOIN USER_CONS_COLUMNS b ON c_pk.CONSTRAINT_NAME = b.CONSTRAINT_NAME
WHERE c.CONSTRAINT_TYPE = 'R'
  AND a.TABLE_NAME = 'S_CONTACT'
ORDER BY a.CONSTRAINT_NAME;

-- ========================================
-- Performance Queries
-- ========================================

-- Query 10: Find recently modified records
SELECT 
    NAME,
    TYPE_CD,
    DB_LAST_UPD,
    LAST_UPD_BY
FROM S_ORG_EXT
WHERE DB_LAST_UPD > SYSDATE - 1
ORDER BY DB_LAST_UPD DESC;

-- Query 11: Audit trail query
SELECT 
    ROW_ID,
    CREATED,
    CREATED_BY,
    LAST_UPD,
    LAST_UPD_BY,
    MODIFICATION_NUM
FROM S_ORG_EXT
WHERE ROW_ID = '[SPECIFIC_ROW_ID]';

-- ========================================
-- Common Patterns
-- ========================================

-- Query 12: Pagination pattern
SELECT * FROM (
    SELECT 
        a.*,
        ROW_NUMBER() OVER (ORDER BY NAME) as RN
    FROM S_ORG_EXT a
    WHERE TYPE_CD = 'Customer'
)
WHERE RN BETWEEN 1 AND 100;

-- Query 13: Hierarchical query (if org hierarchy exists)
SELECT 
    LEVEL,
    LPAD(' ', 2 * (LEVEL - 1)) || NAME as HIERARCHY,
    ROW_ID,
    PAR_OU_ID
FROM S_ORG_EXT
START WITH PAR_OU_ID IS NULL
CONNECT BY PRIOR ROW_ID = PAR_OU_ID
ORDER SIBLINGS BY NAME;

-- ========================================
-- Utility Queries
-- ========================================

-- Query 14: Check for orphaned records
SELECT 
    c.ROW_ID,
    c.FIRST_NAME,
    c.LAST_NAME
FROM S_CONTACT c
WHERE NOT EXISTS (
    SELECT 1 
    FROM S_ORG_EXT a 
    WHERE a.ROW_ID = c.PR_DEPT_OU_ID
);

-- Query 15: Find duplicate records
SELECT 
    EMAIL_ADDR,
    COUNT(*) as DUPLICATE_COUNT
FROM S_CONTACT
WHERE EMAIL_ADDR IS NOT NULL
GROUP BY EMAIL_ADDR
HAVING COUNT(*) > 1
ORDER BY DUPLICATE_COUNT DESC;

-- ========================================
-- Notes:
-- ========================================
-- 1. Always use WHERE clauses to limit result sets
-- 2. Add date filters for better performance
-- 3. Use appropriate indexes
-- 4. Test queries in development before production
-- 5. Be mindful of database locks when running updates
-- 6. Replace [SPECIFIC_ROW_ID] with actual ROW_ID values
