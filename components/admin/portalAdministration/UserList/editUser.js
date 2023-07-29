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
const EditUserForm = () => {
    const router = useRouter();
    const getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }
    
    const [UserRoles, setUserRoles] = useState([]);
    const [selectedUserTypeId, setSelectedUserTypeId] = useState(); // New state to store selected user type ID
    const [showpassword, setShowpassword] = useState(false);
    const [showconfirmpassword, setShowconfirmpassword] = useState(false);
    const [EditObj, setEditObj] = useState({});
    const [userId, setUserId] = useState();
  
   
    useEffect(() => {
       console.log(localStorage.getItem("EditUserArray") === "[object Object]","check this")
        if (typeof window !== 'undefined') {
            if(localStorage.getItem("EditUserArray") != "[object Object]"){
            const obj = JSON.parse(localStorage.getItem("EditUserArray"))
           console.log(obj.first_name,"check this in edit")
           setEditObj(obj);
           setSelectedUserTypeId(obj.user_type_id)
           setUserId(obj.user_id)
        }
        }

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

    // useEffect(() => {
    //     if (error !== '') {
    //       // Set a timer to clear the error after 3 seconds
    //       const timer = setTimeout(() => {
    //         setError('');
    //       }, 3000);
    
    //       // Clear the timer when the component unmounts or when error changes
    //       return () => clearTimeout(timer);
    //     }
    //   }, [error]);
    if (typeof window !== 'undefined') {
    if(localStorage.getItem("EditUserArray") != "[object Object]"){

    if (!EditObj.first_name) {
        // If EditObj is not yet populated, render a loading state or return null
        return <p>Loading...</p>;
      }
}
} 
      const existingData = {
        firstname: EditObj.first_name || "",
        lastname: EditObj.last_name || "",
        email: EditObj.email || "",
        status: EditObj.status || ""
      };
    
      console.log(existingData.firstname, "firstname value");
    return (
        <Formik
        initialValues={existingData}

            validationSchema={Yup.object().shape({
                firstname: Yup.string().required(),
                lastname: Yup.string().required(),
                email: Yup.string().required(),
                status: Yup.string().required(),
            })}
            
            onSubmit={async (values) => {
                console.log(values.firstname,values.lastname,values.email,
                    values.password,values.confirmPW,selectedUserTypeId)
                
                if(values.password === values.confirmPW){

 
                    const validToken = localStorage.getItem("loginToken")
                  
                    const obj = {
                      "email": values.email,
                      "first_name": values.firstname,
                      "last_name": values.lastname,
                      "user_type_id": selectedUserTypeId,
                      "gender":values.gender,
                      "status":values.status,
                      "mobile":""
                  }
                  console.log(obj)
                
                    try {
                      const response = await axios.put(`https://aagama2.adgrid.in/admin/edit-user/${userId}`, obj, {
                         headers: {
                          'Authorization': 'Bearer ' + validToken
                        }
                      });
                      console.log(response);
                      localStorage.setItem("EditUserArray",{})
                    toast.success("Edited User Succesfully");
                    router.push('/admin/portalAdministration/UserList');
                    } catch (error) {
                      console.log(error);
                      
                    }
                  
                  
                }
                else{
                    toast.error("Password and confirm password doesn't match");
                }
                
            }}
            render={() => (
                
                <Form>
                    <Row className="gx-3">
                        <Col sm="6" className="form-group">
                            <Field name="firstname" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Name" label="First Name" />
                        </Col>
                        <Col sm='6' className="form-group">
                            <Field name="lastname" type="text" component={ReactstrapInput} className="form-control" placeholder="Enter Your Surname" label="Last Name" />
                        </Col>
                        <Col sm="6" className="form-group">
                            <Field name="email" type="email" component={ReactstrapInput} className="form-control" placeholder="Enter Your Email" label="Email Address" />
                        </Col>
                        
                        
                        <Col sm="6" className="form-group">
                            <label className="label-color form-label">User Type</label>
                        <select
                name="userType"
                component="select"
                className={ selectedUserTypeId === 'User Type' ? "form-control is-invalid form-select" : "form-control  form-select"}
                label="User Type"
                onChange={(e) => {setSelectedUserTypeId(e.target.value)
                console.log(e.target.value)}} // Update the selected user type ID
              >
                {UserRoles.map((role) => (
                  <option key={role.id} value={role.id} selected={role.id === selectedUserTypeId ? true : false }>
                    {role.name}
                  </option>
                ))}
              </select>
              {
                selectedUserTypeId === 'User Type' &&
              <div class="invalid-feedback">userType is a required field</div>
              }
                        </Col>

                        <Col sm="6" className="form-group">
                            <Field name="status" component={ReactstrapSelect} className="form-control" label="Status"
                                inputprops={{ options: ["Active", "Inactive","Pending"], defaultOption: "Status" }}
                            />
                        </Col>
                       
                        
                        
                    </Row>
                    <div className="dropzone-admin mb-0">
                       
                        <Col sm='12' className="form-btn" style={{marginBottom:10}}>
                           
                            <Button type="submit" className="btn btn-gradient btn-pill">Submit</Button>
                            <Link  href="./" className="btn btn-dashed btn-pill" onClick={()=>{  localStorage.setItem("EditUserArray",{})}}>Cancel</Link>
                        </Col>
                    </div>
                </Form>
            )}
        />
    )
}

export default EditUserForm