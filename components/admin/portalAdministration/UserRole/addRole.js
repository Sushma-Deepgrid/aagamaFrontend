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
const AddRoleForm = () => {
    const router = useRouter();
    const ColumnName = ["All", "View", "Add", "Edit", "Delete"];
    const Roles = [
      "Admin Dashboard",
      "Portal Administration",
      "Property Management",
      "Property List",
      "Service List",
    ];
    const tdStyle = {
      padding: "5px",
      verticalAlign: "middle",
      textAlign: "center",
    };
    const [UserRoles, setUserRoles] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(
      new Array(Roles.length).fill(false)
    );
    const [selectedRoles, setSelectedRoles] = useState([]);
    useEffect(() => {
        
      localStorage.setItem('AssignItemsPropertyId','')
      async function fetchTrackApiData() {
        const validToken = localStorage.getItem("loginToken");
        try {
          const response = await axios.get(
            `https://aagama2.adgrid.in/admin/user-types`,
            {
              headers: {
                Authorization: "Bearer " + validToken,
              },
            }
          );
    
          await console.log(response);
          
          const userRoleNames = [
            { id: null, name: 'User Type' },
            {
              id: 3,
              name: "Customer"
            },
            ...response.data.userTypes.map(item => ({
              id: item.user_type_id,
              name: item.user_type_name
            }))
          ];

          console.log(userRoleNames)
          setUserRoles(userRoleNames);
        
        } catch (error) {
          await console.error(error);
          // window.alert("Can't Assign Same Track Name")
        }
      }
      fetchTrackApiData();
    }, [1]);
   

    const handleSelectAllClick = (event, index) => {
      const newCheckedValue = event.target.checked;
  
      const checkboxes = document.querySelectorAll(
        `input[type="checkbox"][name^="group[19][${index}]"]`
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
      console.log(selectedRoles)
    };
    const handleCheckboxClick = (event, index) => {
      const checkboxes = document.querySelectorAll(
        `input[type="checkbox"][name^="group[19][${index}]"]`
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
    return (
        <Formik
            initialValues={{
                rolename: ""
            }}
            validationSchema={Yup.object().shape({
                rolename: Yup.string().required()
            })}
            
            onSubmit={async (values) => {
                console.log(selectedRoles,values.rolename)
                
                    const validToken = localStorage.getItem("loginToken")
                    const permissionDict = {};
  
                    for (const role of selectedRoles) {
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
                      "user_type_name": values.rolename,
                      "status": "Active",
                      "permissions": Object.values(permissionDict),
                  }
                  console.log(obj)
                
                    try {
                      const response = await axios.post(`https://aagama2.adgrid.in/admin/add-user-type`, obj, {
                         headers: {
                          'Authorization': 'Bearer ' + validToken
                        }
                      });
                      console.log(response);
                    toast.success("Role Added Succesfully");
                    router.push('/admin/portalAdministration/UserRole');
                    } catch (error) {
                      console.log(error);
                      
                    }
                  
            }}
            render={() => (
                
                <Form>
                    <Row className="gx-3">
                        <Col sm="12" className="form-group">
                            <Field name="rolename" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Role Name" label="Role Name" />
                        </Col>
                       <Col>
                       <div>
                          <table className="table">
                            <tr style={{textAlign:'center'}}>
                              <th style={tdStyle}></th>
                              {ColumnName.map((data, index) => (
                                <th style={tdStyle} key={index}>
                                  {data}
                                </th>
                              ))}
                            </tr>
                            {Roles.map((data, index) => (
                              <tr style={{textAlign:'center'}} key={index}>
                                <th style={tdStyle}>{data}</th>
                                <td>
                                  <input
                                    id={`selectAll-${index}`}
                                    type="checkbox"
                                    // checked={selectAllChecked[index]}
                                    onChange={(event) =>
                                      handleSelectAllClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`checkbox-${index}-0`}
                                    type="checkbox"
                                    name={`group[19][${index}]`}
                                    value={8 * index}
                                    onChange={(event) =>
                                      handleCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`checkbox-${index}-1`}
                                    type="checkbox"
                                    name={`group[19][${index}]`}
                                    value={8 * index + 1}
                                    onChange={(event) =>
                                      handleCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`checkbox-${index}-2`}
                                    type="checkbox"
                                    name={`group[19][${index}]`}
                                    value={8 * index + 2}
                                    onChange={(event) =>
                                      handleCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    id={`checkbox-${index}-3`}
                                    type="checkbox"
                                    name={`group[19][${index}]`}
                                    value={8 * index + 3}
                                    onChange={(event) =>
                                      handleCheckboxClick(event, index)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                       </Col>
                        
                    </Row>
                    <div className="dropzone-admin mb-0">
                       
                        <Col sm='12' className="form-btn" style={{marginBottom:10}}>
                           
                            <Button type="submit" className="btn btn-gradient btn-pill">Submit</Button>
                            <Link  href="./" className="btn btn-dashed btn-pill">Cancel</Link>
                        </Col>
                    </div>
                </Form>
            )}
        />
    )
}

export default AddRoleForm