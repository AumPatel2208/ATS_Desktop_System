# Recording Notes

## Sales
-  **2.1**
   - [ ] **2.1.3**. Make an interline sale to a valued customer, DaveD. Record the sale as “pay later” (see 2.1.4). Use blank 444-0000-0025 and sale details like the first sale by Penelope. (see the test data given in the Sample Data document, p.2). 
      - Correct behaviour: The sale made successfully and DaveD’s balance increased correctly. 1 mark for correct behaviour. 
    - [ ] **2.1.4**. DaveD pays for the last ticket purchased. 
      - Correct behaviour: DaveD’s balance restored to the previous level. 1 mark for correct behaviour. 
- **2.2.** Refund a ticket 
  - [ ] **2.2.1.** Refund 444-0000-0003
    -  Correct behaviour: Data entered and saved correctly in a log file, not DB. 2 marks for correct behaviour. 

## Customers
- [ ] **4.1**  Show Records of available customers. 
  - Correct behaviour: Records available and as defined in the test data given in the Sample Data document (SarahB, etc.), or some equivalent records exist. 2 marks for correct behaviour. 
- [ ] **4.2.** Alert of late payment. The records about late payment by Chris. 
  - Correct behaviour: Late payment discovered, and alert raised for the Manager; might need to change the system clock (this is possible, since you will use your own computer, which will be the case). Alternatively, change the date of the unpaid sale, in order to initiate the functionally of raising, and detecting, late payment. Also, the Manager acknowledges the alert, e.g. closes the pop-up message, or does an equivalent action. **5 marks** for correct behaviour. (If no acknowledgment or equivalent functionality exists, only **2 marks**). 

## General Functionality
- [ ]  **5.3.** Multiple tables’ search (e.g. Amount due by a Regular/Valued customer is likely to be one such, or any other). 
  - Correct behaviour: Data retrieved from multiple tables (e.g. SQL JOIN used, etc.). 1 mark. 
- **5.4.** Backup/Restore. Login as an Administrator. 
  - [x] **5.4.1.** Show Backup functionality. Correct behaviour: Backup successfully completed; separate (set of) 
file(s) created. Award 3 marks for correct behaviour. 
  - [x] **5.4.2.** Show Restore functionality. Must have a separate utility. 
Correct behaviour: Restore successful – DB state restored to the values from the selected backup. 3 marks for correct behaviour. Restore needs to be initiated while no connection to the DB exists). For validation: show us a value in the DB before the restore, and how it changed after a restore took place. 


## Database Transactions / Concurrency control 
**6. ‘F: Database transactions’**
▪ Show us the source code where you have (attempted to) implement(ed) concurrency control between multiple users of the system. 
▪ This material has been delivered in the JDBC lecture given in week 8 
▪ This is in relation to the penultimate paragraph in the Student’s Brief document on p18: “It is important that an appropriate Concurrency Control mechanism...” 
▪ You should have implemented transactions/concurrency control, e.g. in Java by removing the statement-level committing (by setting configuration parameter AUTOCOMIT, of database connection, to OFF, i.e. disabled) and then setting the appropriate transaction isolation level. 
▪ Show us the pieces of code, which confirm the use of transactions (e.g. if using Java, JDBC is to be used most likely). 
▪ 2 marks 

## GUI 
**7. ‘G: GUI’.**
- Appearance of the forms (intuitive, aesthetically pleasing), usability, and consistency (of style of forms, 
appearance, colour scheme). 
  - Up to 10 marks is to be awarded. 

## Efficient/extra features 
**8. ‘H: Efficient/extra features’.**
- Any other functionality (not explicitly required in the Student’s Brief, but related to ATS, of course), or a required feature implemented to a very high standard/ efficiently, etc. 
  - Up to 4 marks to be awarded. 

















<!-- # Notes

## **Access**

### Customers

-   Office Manager
-   Travel Advisor

### Reports

-   Office Manager
-   Travel Advisor (some are restricted)

### Blanks

-   Office Manager
-   System Administrator

### Register Staff

-   Office Manager
-   ?? system admin ??

### Commission Rates

-   Office Manager

### Exchange Rates

-   Office Manager

### Backup Restore

-   System Administrator

## **_Issues_** -->
