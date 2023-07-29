import { Field, Form, Formik } from 'formik';
import React,{useState,useEffect} from 'react'
import * as Yup from 'yup';
import Dropzone from 'react-dropzone-uploader';
import { Button, Col, Row } from 'reactstrap';
import { ReactstrapInput, ReactstrapSelect } from '../../../utils/ReactStarpInputsValidation';
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const EditRoleForm = () => {
    const router = useRouter();
    const tdStyle = {
      padding: "5px",
      verticalAlign: "middle",
      textAlign: "center",
    };
    const ColumnName = ["All", "View", "Add", "Edit", "Delete"];
    const Roles = [
      "Admin Dashboard",
      "Portal Administration",
      "Property Management",
      "Property List",
      "Service List",
    ];
    const [selectedUserTypeId, setSelectedUserTypeId] = useState(); // New state to store selected user type ID
    const [EditObj, setEditObj] = useState({});
    const [userId, setUserId] = useState();
    const [selectAllChecked, setSelectAllChecked] = useState(
      new Array(Roles.length).fill(false)
    );
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [Reload, setReload] = useState(false);
  
    useEffect(() => {
       console.log(localStorage.getItem("EditRoleArray"),"check this")
        if (typeof window !== 'undefined') {
            if(localStorage.getItem("EditRoleArray") != "[object Object]"){
            const obj = JSON.parse(localStorage.getItem("EditRoleArray"))
            setUserId(obj.user_type_id)
           const obj1 = []
           for(let z=0;z<obj.user_type_permissions.length;z++){
             if(obj.user_type_permissions[z].is_add === 1 && obj.user_type_permissions[z].is_view === 1 &&
               obj.user_type_permissions[z].is_edit === 1 && obj.user_type_permissions[z].is_delete === 1  ){
                   obj1.push({row:obj.user_type_permissions[z].permission.permission_name,
                   col: 'All'})
                   setSelectedRoles(obj1)
                   console.log(obj1)
               }
               else{
                 setSelectedRoles(obj.user_type_permissions)
                 console.log(obj.user_type_permissions)
               }
           }
          
          
           const apiObject = obj.user_type_permissions
       
           for (let i = 0; i < apiObject.length; i++) {
             for (let j = 0; j < Roles.length; j++) {
               if (apiObject[i].permission.permission_name === Roles[j]) {
                 if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_add === 1 &&
                   apiObject[i].is_delete === 1 &&
                   apiObject[i].is_edit === 1
                 ) {
                   const selectallcheckboxId = `editselectAll-${i}`
                   const selectallcheckboxElement =
                     document.getElementById(selectallcheckboxId);
                    setReload(true)
                   if(selectallcheckboxElement != null){
                    selectallcheckboxElement.checked = true;
                    setReload(false)
                   }
                   
       
                   for (let k = 0; k < ColumnName.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${k}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                     }
                   }
                 }
                 else  if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_add === 1 &&
                   apiObject[i].is_edit === 1 
                 ) {
                   
                 
                   for (let k = 0; k < ColumnName.length-2; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${k}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
       
                 else  if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_add === 1 &&
                   apiObject[i].is_delete === 1 
                 ) {
                   
                  const neededArray=[0,1,3]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
                 else  if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_edit === 1 &&
                   apiObject[i].is_delete === 1 
                 ) {
                   
                  const neededArray=[0,2,3]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
                 else  if (
                   apiObject[i].is_add === 1 &&
                   apiObject[i].is_edit === 1 &&
                   apiObject[i].is_delete === 1 
                 ) {
                   
                  const neededArray=[1,2,3]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
                 else  if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_add === 1 
                 ) {
                   
                  const neededArray=[0,1]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
                 else  if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_edit === 1 
                 ) {
                   
                  const neededArray=[0,2]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
       
                 else  if (
                   apiObject[i].is_view === 1 &&
                   apiObject[i].is_delete === 1 
                 ) {
                   
                  const neededArray=[0,3]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
       
                 else  if (
                   apiObject[i].is_add=== 1 &&
                   apiObject[i].is_edit === 1 
                 ) {
                   
                  const neededArray=[1,2]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
       
                 else  if (
                   apiObject[i].is_add=== 1 &&
                   apiObject[i].is_delete === 1 
                 ) {
                   
                  const neededArray=[1,3]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
       
                 else  if (
                   apiObject[i].is_edit=== 1 &&
                   apiObject[i].is_delete === 1 
                 ) {
                   
                  const neededArray=[2,3]
                   for (let k = 0; k < neededArray.length; k++) {
                     const selectSingleCheckBoxId = `editcheckbox-${i}-${neededArray[k]}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   }
                 }
       
                 else  if (
                   apiObject[i].is_view=== 1
                 ) {
                  
                     const selectSingleCheckBoxId = `editcheckbox-${j}-${0}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                    setReload(true)
                    if (selectSinglecheckboxElement) {
                      selectSinglecheckboxElement.checked = true;
                      setReload(false)
                    }
                   
                 }
                 else  if (
                   apiObject[i].is_add=== 1
                 ) {
                     const selectSingleCheckBoxId = `editcheckbox-${j}-${1}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   
                 }
       
                 else  if (
                   apiObject[i].is_edit=== 1
                 ) {
                     const selectSingleCheckBoxId = `editcheckbox-${j}-${2}`;
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   
                 }
       
                 else  if (
                   apiObject[i].is_delete=== 1
                 ) {
                     const selectSingleCheckBoxId = `editcheckbox-${j}-${3}`
                     const selectSinglecheckboxElement = document.getElementById(
                       selectSingleCheckBoxId
                     );
                     // console.log(selectSinglecheckboxElement)
                     setReload(true)
                     if (selectSinglecheckboxElement) {
                       selectSinglecheckboxElement.checked = true;
                       setReload(false)
                     }
                   
                 }
               }
             }
           }

           setEditObj(obj);
           setSelectedUserTypeId(obj.user_type_id)
        }
        }


    }, [Reload]);

    const handleEditSelectAllClick = (event, index) => {
      const newCheckedValue = event.target.checked;
  
      const checkboxes = document.querySelectorAll(
        `input[type="checkbox"][name^="group[19edit][${index}]"]`
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = newCheckedValue;
      });
  
      setSelectAllChecked((prevState) => {
        const newState = [...prevState];
        newState[index] = newCheckedValue;
  
        return newState;
      });
      if (newCheckedValue) {
        // "All" checkbox is checked, remove all individual items for this row from selectedRoles
        setSelectedRoles((prevState) => {
          return prevState.filter(
            (role) => role.row !== Roles[index] || role.col === "All"
          );
        });
  
        // Add "All" to selectedRoles for this row
        setSelectedRoles((prevState) => [
          ...prevState,
          { row: Roles[index], col: "All" },
        ]);
      } else {
        // "All" checkbox is unchecked, remove "All" from selectedRoles for this row
        setSelectedRoles((prevState) => {
          return prevState.filter(
            (role) => role.row !== Roles[index] || role.col !== "All"
          );
        });
      }
      console.log(selectedRoles,Roles[index])
    };
  
    const handleEditCheckboxClick = (event, index) => {
      const checkboxes = document.querySelectorAll(
        `input[type="checkbox"][name^="group[19edit][${index}]"]`
      );
      let isAllChecked = true;
      checkboxes.forEach((checkbox) => {
        if (!checkbox.checked) {
          isAllChecked = false;
        }
      });
  
      setSelectAllChecked((prevState) => {
        const newState = [...prevState];
        newState[index] = isAllChecked;
  
        return newState;
      });
  
      const rowName = event.target.name.split("[")[2].replace("]", "");
      const colName = Number(event.target.id.split("-")[2]) + 1;
  
      if (event.target.checked) {
        setSelectedRoles([
          ...selectedRoles,
          { row: Roles[rowName], col: ColumnName[colName] },
        ]);
      } else {
        setSelectedRoles(
          selectedRoles.filter(
            (role) =>
              !(role.row === Roles[rowName] && role.col === ColumnName[colName])
          )
        );
      }
      console.log(selectedRoles, Roles[rowName], ColumnName[colName], colName);
    };
    if (typeof window !== 'undefined') {
    if(localStorage.getItem("EditRoleArray") != "[object Object]"){

    if (!EditObj.user_type_name) {
        // If EditObj is not yet populated, render a loading state or return null
        return <p>Loading...</p>;
      }
}
} 
      const existingData = {
        rolename: EditObj.user_type_name || "",
        status: EditObj.status || ""
      };
    
      console.log(existingData.firstname, "firstname value");
    return (
        <Formik
        initialValues={existingData}

            validationSchema={Yup.object().shape({
              rolename: Yup.string().required(),
                status: Yup.string().required()
            })}
            
            onSubmit={async (values) => {
                console.log(selectedUserTypeId)
                
                    const validToken = localStorage.getItem("loginToken")
                    const permissionDict = {};

    for (const role of selectedRoles) {
      console.log(role)
      const { row, col } = role;

      if (!(row in permissionDict)) {
        permissionDict[row] = {
          permission_name: row,
          is_view: false,
          is_add: false,
          is_edit: false,
          is_delete: false,
        };
        
      }

      const permission = permissionDict[row];
      if (row === "Admin Dashboard") {
        permission.permission_id = 1;
        
      } else if (row === "Portal Administration") {
        permission.permission_id = 2;
        
      } else if (row === "Property Management") {
        permission.permission_id = 3;
        
      } else if (row === "Property List") {
        permission.permission_id = 4;
        
      } else if (row === "Service List") {
        permission.permission_id = 5;
        
      }

      if (col === "All") {
        permission.is_view = true;
        permission.is_add = true;
        permission.is_edit = true;
        permission.is_delete = true;
        
      } else if (col === "Edit") {
        permission.is_edit = true;
        
      } else if (col === "View") {
        permission.is_view = true;
        
      } else if (col === "Add") {
        permission.is_add = true;
        
      } else if (col === "Delete") {
        permission.is_delete = true;
        
      }
    }

                    const obj = {
                      user_type_name: values.rolename,
                    status: values.status,
                  permissions: Object.values(permissionDict),
                  }
                  console.log(obj)
                
                    try {
                      const response = await axios.put(`https://aagama2.adgrid.in/admin/edit-user-type/${userId}`, obj, {
                         headers: {
                          'Authorization': 'Bearer ' + validToken
                        }
                      });
                      console.log(response);
                      localStorage.setItem("EditRoleArray",{})
                    toast.success("Edited User Succesfully");
                    router.push('/admin/portalAdministration/UserRole');
                    } catch (error) {
                      console.log(error);
                      
                    }
                  
                  
              
                
            }}
            render={() => (
                
                <Form>
                    <Row className="gx-3">
                    <Col sm="6" className="form-group">
                            <Field name="rolename" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Role Name" label="Role Name" />
                        </Col>
                        <Col sm="6" className="form-group">
                            <Field name="status" component={ReactstrapSelect} className="form-control" label="Status"
                                inputprops={{ options: ["Active", "Inactive","Pending"], defaultOption: "Status" }}
                            />
                        </Col>

                        <Col>
                        <table className="table">
                            <tr>
                              <th style={tdStyle}></th>
                              {ColumnName.map((data, index) => (
                                <th style={tdStyle} key={index}>
                                  {data}
                                </th>
                              ))}
                            </tr>
                            {Roles.map((data, index) => (
                              <tr key={index}>
                                <th style={tdStyle}>{data}</th>
                                <td>
                                  <input
                                    id={`editselectAll-${index}`}
                                    type="checkbox"
                                    
                                    onChange={(event) =>
                                      handleEditSelectAllClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`editcheckbox-${index}-0`}
                                    type="checkbox"
                                    name={`group[19edit][${index}]`}
                                    value={8 * index}
                                    onChange={(event) =>
                                      handleEditCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`editcheckbox-${index}-1`}
                                    type="checkbox"
                                    name={`group[19edit][${index}]`}
                                    value={8 * index + 1}
                                    onChange={(event) =>
                                      handleEditCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`editcheckbox-${index}-2`}
                                    type="checkbox"
                                    name={`group[19edit][${index}]`}
                                    value={8 * index + 2}
                                    onChange={(event) =>
                                      handleEditCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`editcheckbox-${index}-3`}
                                    type="checkbox"
                                    name={`group[19edit][${index}]`}
                                    value={8 * index + 3}
                                    onChange={(event) =>
                                      handleEditCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </table>
                        </Col>
                        
                        
                        
                      
                       
                        
                        
                    </Row>
                    <div className="dropzone-admin mb-0">
                       
                        <Col sm='12' className="form-btn" style={{marginBottom:10}}>
                           
                            <Button type="submit" className="btn btn-gradient btn-pill">Submit</Button>
                            <Link  href="./" className="btn btn-dashed btn-pill" onClick={()=>{  localStorage.setItem("EditRoleArray",{})}}>Cancel</Link>
                        </Col>
                    </div>
                </Form>
            )}
        />
    )
}

export default EditRoleForm