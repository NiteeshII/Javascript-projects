const employeeList = document.getElementById("Employees_names--list");
const employeeinfo = document.getElementById("Employees_single--info");
const addEmployeebtn = document.querySelector(".add-Employee");
const addEmployeeContainer = document.querySelector(".Add-Employee-container");
const addEmployeeForm = document.querySelector(".Add-Employee-create");
const employees = document.querySelector(".Employees_names");
const employeeSingle = document.querySelector(".Employees_single");

(async function () {
  const response = await fetch("data.json");
  const data = await response.json();
  let employeedata = data;
  console.log(employeedata);
  let selectedEmployeeId = employeedata[0].id;
  let selectedEmployee = employeedata[0];

  employeeList.addEventListener("click", getEmployeeInfo);

  function getEmployeeInfo(e) {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      const elementsSelected = [...employeedata];
      const selected = elementsSelected.find((item) => {
        console.log(selectedEmployeeId);
        return item.id === +selectedEmployeeId;
      });
      selectedEmployee = selected;
      renderEmployees();
      renderEmployeeInfo();
      console.log(selectedEmployeeId, selected);
    }

    if (e.target.tagName === "I") {
      employeedata = employeedata.filter(
        (item) => String(item.id) !== e.target.parentNode.id
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employeedata[0]?.id || -1;
        selectedEmployee = employeedata[0] || {};
        renderEmployeeInfo();
      }

      renderEmployees();
      employeeSingle.scroll({
        top: 0,
        behavior: "smooth",
      });
      employees.scroll({
        top: 0,
        behavior: "smooth",
      });
      window.scrollTo(0, 0);
    }
  }

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employeedata.forEach((element) => {
      const employeeName = document.createElement("span");
      employeeName.classList.add("Employees_names--item");
      if (parseInt(selectedEmployeeId, 10) === element.id) {
        employeeName.classList.add("selected");
        // selectedEmployee = element;
      }
      employeeName.setAttribute("id", element.id);
      employeeName.innerHTML = `${element.firstName} ${element.lastName} <i className="employeeDelete">❌</i>`;
      employeeList.append(employeeName);
    });
  };

  function renderEmployeeInfo() {
    if (employeedata.length === 0) {
      employeeinfo.innerHTML = "";
      return;
    }
    employeeinfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
        </span>
        <span>${selectedEmployee.address}</span>
        <span>${selectedEmployee.email}</span>
        <span>Mobile - ${selectedEmployee.contactNumber}</span>
        <span>DOB - ${selectedEmployee.dob}</span>
      `;
  }

  addEmployeebtn.addEventListener("click", () => {
    addEmployeeContainer.style.display = "flex";
  });

  addEmployeeContainer.addEventListener("click", (e) => {
    if (e.target.className === "Add-Employee-container") {
      addEmployeeContainer.style.display = "none";
    }
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    console.log(values);
    values.forEach((value) => {
      empData[value[0]] = value[1];
    });

    empData.id = employeedata[employeedata.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employeedata.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeContainer.style.display = "none";
  });

  if (selectedEmployee) renderEmployeeInfo(selectedEmployee);

  renderEmployees();
})();
