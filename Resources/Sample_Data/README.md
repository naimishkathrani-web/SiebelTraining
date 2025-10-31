# Sample Data Files

This folder contains sample data files for import/export exercises and testing.

## Available Datasets

### Account Data
- `accounts.xml` - Sample account records (50 accounts)
- `accounts_large.xml` - Large dataset for testing (500 accounts)
- `accounts_template.xml` - Template for creating custom data

### Contact Data
- `contacts.xml` - Sample contact records (100 contacts)
- `contacts_with_accounts.xml` - Contacts linked to accounts
- `contacts_template.xml` - Template for creating custom data

### Opportunity Data
- `opportunities.xml` - Sample opportunity records (75 opportunities)
- `opportunities_with_products.xml` - Opportunities with line items
- `opportunities_template.xml` - Template for creating custom data

### Activity Data
- `activities.xml` - Sample activity records (tasks, calls, meetings)
- `activities_template.xml` - Template for creating custom data

### Product Data
- `products.xml` - Sample product catalog
- `price_lists.xml` - Sample pricing data

## Data Format

All data files are in XML format compatible with Siebel Integration Objects.

### Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<SiebelMessage>
    <IntegrationObject>
        <IntegrationComponent>
            <Field>Value</Field>
            ...
        </IntegrationComponent>
    </IntegrationObject>
</SiebelMessage>
```

## Usage Instructions

### For Import Exercises

1. Download the appropriate XML file
2. Use EAI Siebel Adapter or Import Wizard
3. Map fields as required
4. Execute import
5. Verify imported data

### For Export Exercises

1. Query records in Siebel
2. Use EAI Siebel Adapter or Export functionality
3. Export to XML format
4. Validate exported XML
5. Compare with sample files

### For Testing

1. Use sample data to populate test environments
2. Create test scenarios with known data
3. Validate workflows and business logic
4. Test integration objects

## Data Characteristics

### Account Data
- Various account types (Customer, Prospect, Partner)
- Different locations and industries
- Range of account statuses
- Realistic business data

### Contact Data
- Linked to accounts
- Various roles and positions
- Complete contact information
- Email and phone data

### Opportunity Data
- Different sales stages
- Revenue range: $1,000 - $1,000,000
- Various close dates
- Associated with accounts

## Creating Custom Data

Use the template files to create your own test data:

1. Copy a template file
2. Modify field values as needed
3. Ensure ROW_ID uniqueness
4. Validate XML structure
5. Test import process

## Notes

- All sample data is fictional
- ROW_IDs are generated GUIDs
- Dates use ISO 8601 format (YYYY-MM-DD)
- Required fields are populated in all samples
- Data follows Siebel naming conventions

## Data Refresh

To reset your environment:

1. Export current data for backup
2. Delete test records
3. Import fresh sample data
4. Verify data integrity

## Best Practices

- Always test imports in development first
- Backup data before importing
- Validate XML before import
- Check for duplicate records
- Verify relationships after import
- Review import logs for errors

## Support

If you encounter issues with data files:
- Check XML validation
- Verify integration object configuration
- Review field mappings
- Check import logs
- Contact instructor for assistance
