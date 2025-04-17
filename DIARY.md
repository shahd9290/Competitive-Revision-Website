# 📘 Development Diary

### 📅 30/09/24 - 06/10/24  
- Composed Abstract for Project Plan

---

### 📅 07/10/24 - 10/10/24  
- Completed Project Plan

---

### 📅 11/10/24  
- Begin designing key components for the software
- Import base project for frontend and backend.

---

### 📅 12/10/24 - 13/10/24  
- Created initial versions for login/registration screens.
- Backend functionality still to be implemented. 

---

### 📅 14/10/24 - 20/10/24  
- Implemented backend functionality for user authentication and refresh tokens. 
- Linked to frontend. 
- Implemented semi-automated token refreshing (Relies on user to load a new page at the moment).

---

### 📅 04/11/24 - 08/11/24  
- Begin work on Question Bank

---

### 📅 12/11/24 - 16/11/24  
- Created Subject and Qualification models. 
- Qualifications embedded into the system. 
- Subject Search functionality to be implemented.

---

### 📅 23/11/24 - 24/11/24  
- Implemented Topics
- Begin search implementation to frontend.

---

### 📅 27/11/24 - 03/12/24  
- Integrated Modal into search - with topics for the subject in each dialog box.

---

### 📅 03/12/24 - 08/12/24  
- Completed Tests for all components & worked on interim report.

---

### 📅 08/12/24 - 13/12/24  
- Continued to work on and complete Interim Report.

---

### 📅 15/12/24 - 22/12/24  
- Increased security. 
    - Introduced `.env` for frontend and example files for both frontend/backend. 
    - JSON SSL keys are no longer committed to repository either. 
- Created Question Model for backend.

---

### 📅 23/12/24 - 29/12/24  
- Added backend functionality so questions can be saved to the system.

---

### 📅 30/12/24 - 05/01/25  
- Completed Quiz System. 
    - Users can answer questions and marks earned will be applied to their profile. 
    - Incorrect answers will deduct marks.

---

### 📅 20/01/25 - 27/01/25  
- Save user attempts to the database.

---

### 📅 27/01/25 - 03/02/25  
- Recent attempts is included when loading user dashboard. 
- Displayed in a table with their score as a percentage.

---

### 📅 03/02/25 - 10/02/25  
- Begin work on admin dashboard - copied login page for admin authentication.

---

### 📅 10/02/25 - 17/02/25  
- Implemented Role Based Access Control

---

### 📅 17/02/25 - 24/02/25  
- Begin to restructure backend
    - Moved adding endpoints (for questions/topics/etc) to a dedicated Admin Controller.

---

### 📅 24/02/25 - 03/03/25  
- Begin implementation of admin dashboard. Includes:
    - Admin Login
    - Users Table
    - Questions Table
    - Start of Subjects Table.

---

### 📅 03/03/25 - 10/03/25  
- Fix bugs
- Optimise data fetching
- Restructuring
- Qualification Data fetched from backend.

---

### 📅 10/03/25 - 17/03/25  
- Table actions. 
    - Row actions (with edit/delete)
    - Pagination
    - Sorting 
    - Filtering. 
- Implemented Add button to each table.

---

### 📅 17/03/25 - 24/03/25  
- Backend Restructuring
- Add button functional for all data tables. 
- Implemented item deletion for each table
- Reduced code repetition.

---

### 📅 24/03/25 - 31/03/25  
- Implementation of edit dialogs for questions and qualifications. 

---

### 📅 31/03/25 - 07/04/25  
- Complete edit dialog for remaining data tables. 
- Quiz cannot be loaded if no questions are present. 
- Recent Attempts deleted when user/topic deleted. 
- Implemented Admin Dashboard with activity log & global recent attempts. 
- Redesigned UI to match shadcn components, including:
    - User Dashboard
    - Subjects Search,
    - Quiz
    - Login Forms

---

### 📅 07/04/25 - 11/04/25  
- Introduced Toaster prompts for better user experience.

---

### 📅 11/04/25 - 18/04/25 
- Work on Final Report