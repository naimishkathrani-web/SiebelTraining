# Day 2 Exercises

## Exercise 1: Business Component Configuration

### Objective
Create and configure a custom business component.

### Instructions
1. Open Siebel Tools
2. Create a new Business Component named "Training BC"
3. Configure the following:
   - Base Table: S_ORG_EXT
   - Add fields: Name, Location, Type, Status
   - Create a join to S_CONTACT
   - Add a calculated field for "Days Since Created"
4. Compile and test your business component

### Deliverables
- Screenshots of the BC configuration
- SIF export of the business component
- Test results showing data retrieval

---

## Exercise 2: Applet Creation

### Objective
Create a custom applet using your business component.

### Instructions
1. Create a new List Applet named "Training List Applet"
2. Associate it with your Training BC
3. Add the following list columns:
   - Name
   - Location
   - Type
   - Status
4. Configure properties:
   - Enable sorting
   - Set default sort order
   - Configure column widths
5. Test the applet in the application

### Deliverables
- Screenshots of the applet configuration
- Screenshots of the applet in the application
- SIF export of the applet

---

## Exercise 3: Workflow Process

### Objective
Create a simple workflow process with decision logic.

### Instructions
1. Create a new Workflow Process named "Training Workflow"
2. Design a workflow that:
   - Takes an opportunity amount as input
   - Uses a decision point to check if amount > 100,000
   - If yes, set opportunity probability to 75%
   - If no, set opportunity probability to 50%
   - Return success message
3. Test the workflow with different inputs

### Deliverables
- Workflow diagram screenshot
- Test results with different input values
- SIF export of the workflow

---

## Exercise 4: eScript Implementation

### Objective
Write and test eScript code.

### Instructions
1. Create a script that:
   - Validates an email address format
   - Calculates discount based on order amount
   - Logs messages to the application log
2. Test the script in:
   - Business service
   - Browser script (if applicable)

### Sample Code Structure
```javascript
function ValidateEmail(email) {
    // Your validation logic here
}

function CalculateDiscount(orderAmount) {
    // Your discount logic here
    // < $1000: 5% discount
    // $1000-$5000: 10% discount
    // > $5000: 15% discount
}
```

### Deliverables
- Complete eScript code
- Test results
- Log file showing script execution

---

## Exercise 5: Integration Object

### Objective
Create and test an integration object.

### Instructions
1. Create an Integration Object named "Training Account IO"
2. Configure integration components for:
   - Account (S_ORG_EXT)
   - Contact (S_CONTACT)
3. Create an export XML with sample data
4. Test import of the same XML
5. Verify data in the application

### Deliverables
- Integration object configuration screenshots
- Export XML file
- Import log
- Verification screenshots

---

## Exercise 6: Complete Use Case

### Objective
Implement a complete business scenario.

### Scenario
Create a custom account validation workflow that:
1. Triggers when account is created or updated
2. Validates required fields
3. Checks for duplicate accounts
4. Assigns account to appropriate owner based on location
5. Sends notification (simulated)

### Instructions
1. Design the solution architecture
2. Create necessary business components
3. Implement workflow process
4. Write required scripts
5. Test thoroughly with different scenarios

### Deliverables
- Solution design document
- All configuration objects (SIF files)
- Test cases and results
- Demonstration video or detailed screenshots

---

## Submission Guidelines

- Complete all exercises
- Document your work thoroughly
- Include all required deliverables
- Save your work in a folder named: YourName_Day2_Exercises
- Be prepared to present your complete use case implementation

## Evaluation Criteria

- Functionality (40%)
- Code quality and best practices (30%)
- Documentation (20%)
- Testing coverage (10%)
