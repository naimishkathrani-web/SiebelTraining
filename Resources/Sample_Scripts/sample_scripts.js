// Sample eScript Functions for Siebel Training
// These scripts demonstrate common patterns and best practices

// ========================================
// Validation Functions
// ========================================

/**
 * Validates email address format
 * @param {String} email - Email address to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
function ValidateEmail(email) {
    try {
        if (email == null || email == "") {
            return false;
        }
        
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in ValidateEmail: " + e.toString());
        return false;
    }
}

/**
 * Validates phone number format
 * @param {String} phone - Phone number to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
function ValidatePhone(phone) {
    try {
        if (phone == null || phone == "") {
            return false;
        }
        
        // Remove all non-numeric characters
        var numericPhone = phone.replace(/\D/g, '');
        
        // Check if it has 10 digits
        return (numericPhone.length == 10);
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in ValidatePhone: " + e.toString());
        return false;
    }
}

// ========================================
// Business Logic Functions
// ========================================

/**
 * Calculates discount based on order amount
 * @param {Number} amount - Order amount
 * @returns {Number} - Discount percentage
 */
function CalculateDiscount(amount) {
    try {
        var discount = 0;
        
        if (amount < 1000) {
            discount = 5;
        }
        else if (amount >= 1000 && amount < 5000) {
            discount = 10;
        }
        else if (amount >= 5000) {
            discount = 15;
        }
        
        return discount;
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in CalculateDiscount: " + e.toString());
        return 0;
    }
}

/**
 * Calculates opportunity probability based on stage
 * @param {String} stage - Sales stage code
 * @returns {Number} - Probability percentage
 */
function GetProbabilityByStage(stage) {
    try {
        var probability = 0;
        
        switch (stage) {
            case "Prospect":
                probability = 10;
                break;
            case "Qualification":
                probability = 25;
                break;
            case "Needs Analysis":
                probability = 40;
                break;
            case "Proposal":
                probability = 60;
                break;
            case "Negotiation":
                probability = 80;
                break;
            case "Closed Won":
                probability = 100;
                break;
            case "Closed Lost":
                probability = 0;
                break;
            default:
                probability = 0;
        }
        
        return probability;
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in GetProbabilityByStage: " + e.toString());
        return 0;
    }
}

// ========================================
// Data Manipulation Functions
// ========================================

/**
 * Formats a date string
 * @param {Date} dateObj - Date object to format
 * @returns {String} - Formatted date string (MM/DD/YYYY)
 */
function FormatDate(dateObj) {
    try {
        if (dateObj == null || dateObj == "") {
            return "";
        }
        
        var month = dateObj.getMonth() + 1;
        var day = dateObj.getDate();
        var year = dateObj.getFullYear();
        
        return month + "/" + day + "/" + year;
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in FormatDate: " + e.toString());
        return "";
    }
}

/**
 * Concatenates first and last name
 * @param {String} firstName - First name
 * @param {String} lastName - Last name
 * @returns {String} - Full name
 */
function GetFullName(firstName, lastName) {
    try {
        var fullName = "";
        
        if (firstName != null && firstName != "") {
            fullName = firstName;
        }
        
        if (lastName != null && lastName != "") {
            if (fullName != "") {
                fullName += " ";
            }
            fullName += lastName;
        }
        
        return fullName;
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in GetFullName: " + e.toString());
        return "";
    }
}

// ========================================
// Business Component Operations
// ========================================

/**
 * Example of querying and iterating through records
 * @param {String} accountName - Account name to search
 * @returns {String} - Row ID of the account
 */
function FindAccountByName(accountName) {
    try {
        var boAccount = TheApplication().GetBusObject("Account");
        var bcAccount = boAccount.GetBusComp("Account");
        
        bcAccount.ClearToQuery();
        bcAccount.SetSearchSpec("Name", accountName);
        bcAccount.ExecuteQuery(ForwardOnly);
        
        var accountId = "";
        if (bcAccount.FirstRecord()) {
            accountId = bcAccount.GetFieldValue("Id");
        }
        
        return accountId;
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in FindAccountByName: " + e.toString());
        return "";
    }
    finally {
        bcAccount = null;
        boAccount = null;
    }
}

/**
 * Creates a new record
 * @param {String} accountName - Name for the new account
 * @returns {String} - Row ID of created account
 */
function CreateAccount(accountName) {
    try {
        var boAccount = TheApplication().GetBusObject("Account");
        var bcAccount = boAccount.GetBusComp("Account");
        
        bcAccount.NewRecord(NewBefore);
        bcAccount.SetFieldValue("Name", accountName);
        bcAccount.SetFieldValue("Type", "Customer");
        bcAccount.WriteRecord();
        
        var newAccountId = bcAccount.GetFieldValue("Id");
        return newAccountId;
    }
    catch (e) {
        TheApplication().RaiseErrorText("Error in CreateAccount: " + e.toString());
        return "";
    }
    finally {
        bcAccount = null;
        boAccount = null;
    }
}

// ========================================
// Utility Functions
// ========================================

/**
 * Logs a message to the application log
 * @param {String} message - Message to log
 */
function LogMessage(message) {
    try {
        TheApplication().Trace("Training Script: " + message);
    }
    catch (e) {
        // Ignore errors in logging
    }
}

/**
 * Shows a user message
 * @param {String} message - Message to display
 */
function ShowUserMessage(message) {
    try {
        TheApplication().RaiseErrorText(message);
    }
    catch (e) {
        // Ignore errors
    }
}

/**
 * Checks if a value is null or empty
 * @param {String} value - Value to check
 * @returns {Boolean} - True if null or empty
 */
function IsNullOrEmpty(value) {
    return (value == null || value == "");
}

// ========================================
// Example Usage in Business Service
// ========================================

/*
function Service_PreInvokeMethod(MethodName, Inputs, Outputs) {
    try {
        if (MethodName == "ValidateAndCreateAccount") {
            var accountName = Inputs.GetProperty("AccountName");
            var email = Inputs.GetProperty("Email");
            
            // Validate inputs
            if (IsNullOrEmpty(accountName)) {
                Outputs.SetProperty("Status", "Error");
                Outputs.SetProperty("Message", "Account name is required");
                return (CancelOperation);
            }
            
            if (!ValidateEmail(email)) {
                Outputs.SetProperty("Status", "Error");
                Outputs.SetProperty("Message", "Invalid email address");
                return (CancelOperation);
            }
            
            // Create account
            var accountId = CreateAccount(accountName);
            
            if (!IsNullOrEmpty(accountId)) {
                Outputs.SetProperty("Status", "Success");
                Outputs.SetProperty("AccountId", accountId);
                LogMessage("Account created successfully: " + accountId);
            }
            else {
                Outputs.SetProperty("Status", "Error");
                Outputs.SetProperty("Message", "Failed to create account");
            }
            
            return (CancelOperation);
        }
    }
    catch (e) {
        Outputs.SetProperty("Status", "Error");
        Outputs.SetProperty("Message", e.toString());
        return (CancelOperation);
    }
    finally {
        return (ContinueOperation);
    }
}
*/
