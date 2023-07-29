import React,{useState,useEffect} from 'react'
import {  Card, CardBody, Container,Table,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, 
    UncontrolledDropdown,} from 'reactstrap'
import Breadcrumb from '../../../../components/Common/Breadcrumb'
import Link from 'next/link'
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
  } from "react-bs-datatable";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useRouter } from 'next/router';
const PropertyList = () => {
    
 
  const router = useRouter();
  const [PortalAdministrationData, setPortalAdministrationData] = useState([])

  const STORY_HEADERS = [
    {
      prop: "first_name",
      title: "Name",
      isFilterable: true
    },
    {
      prop: "email",
      title: "Email",
      isFilterable: true
    },
    {
      prop: "user_type.user_type_name",
      title: 'User Role',
      isFilterable: true,
      cell: (item) => item.user_type.user_type_name
    },
    {
      prop: "created_at",
      title: "Date",
      cell: (item) => {
        const date_object = new Date(item.created_at);
        const year = date_object.getFullYear();
        const month = (date_object.getMonth() + 1).toString().padStart(2, '0');
        const day = date_object.getDate().toString().padStart(2, '0');
        const formatted_date = `${day}-${month}-${year}`;
  
        return <div>{formatted_date}</div>;
      }
    },
    {
      prop: "status",
      title: "Status",
      isSortable: true
    },
    {
      prop: "actions",
      title: "Actions",
      cell: (index) => (
        <div className="App">
        <UncontrolledDropdown style={{marginTop:'-15%'}}>
                          <DropdownToggle
                            tag="a"
                            style={{
                              textDecoration: "none",
                              color: "black",
                              fontSize: "25px",
                              cursor: "pointer",
                              textAlign:'center',
                              verticalAlign:'middle'
                            }}
                          >
                            ...
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem type="button"  data-bs-toggle="modal" data-bs-target="#EditUserPopup" onClick={()=>{OpenEditUserFunction(index)
                            console.log(index)
                            localStorage.setItem("EditUserArray",JSON.stringify(index))
                            router.push('/admin/portalManagement/propertyList/EditProperty');
                            }}>Edit User</DropdownItem>
                            
                           
                          </DropdownMenu>
                        </UncontrolledDropdown>
        </div>
      )
    }
  ];
  
  const [UserRoles, setUserRoles] = useState([]);
  const [selectedUserRole, setselectedUserRole] = useState([]);
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
          {
            id: 2,
            value: "Admin",
            label: "Admin"
          },
          {
            id: 3,
            value: "Customer",
            label: "Customer"
          },
          ...response.data.userTypes.map(item => ({
            id: item.user_type_id,
            value: item.user_type_name,
            label: item.user_type_name
          }))
        ];
        setUserRoles(userRoleNames);
      
      } catch (error) {
        await console.error(error);
        // window.alert("Can't Assign Same Track Name")
      }
    }
    fetchTrackApiData();
  }, [1]);

  function handleUserRoleChange(selectedUserRole) {
    console.log(selectedUserRole);
    setselectedUserRole(selectedUserRole);
    
   
  }
  const [AddUserPopupOpen, setAddUserPopupOpen] = useState(false);
  const [UserId, setUserId] = useState('');
  const [GenderSelected, setGenderSelected] = useState('');
  const [UserRoleSelected, setUserRoleSelected] = useState('');
  const [StatusSelected, setStatusSelected] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [EmailId, setEmailId] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
 
  const inputStyle = {
    border: "2px solid gray",
    borderRadius: "5px",
    width: "50%",
    height: "40px",
  };

  const inputPasswordStyle={
    border: "2px solid gray",
    borderRadius: "5px",
    height: "40px",
    width:" 191px"
  }
  const [refresh, setRefresh] = useState(false);
 
  useEffect(() => {
   
    async function fetchTrackApiData() {
      const validToken = localStorage.getItem("loginToken")
      console.log(`'Authorization': 'Bearer ' + ${validToken}`)
      
      try {
        const response = await axios.get(
          `https://aagama2.adgrid.in/admin/users-with-details`,
          { headers: {
            'Authorization': 'Bearer ' + validToken
          }}
        );

        await console.log(response.data);
      

    setPortalAdministrationData(response.data)

      } catch (error) {
        await console.error(error);
        // window.alert("Can't Assign Same Track Name")
      }
    }
    fetchTrackApiData();
  }, [refresh]);

  function OpenEditUserFunction(index){
   console.log(index)
   setUserId(index.user_id)
   setFirstName(index.first_name)
   setLastName(index.last_name)
   setEmailId(index.email)
   setGenderSelected(index.gender)
   if(index.user_type_id === 1){
    setUserRoleSelected("Super Admin")
   }
   else if(index.user_type_id === 2){
    setUserRoleSelected("Admin")
   }
   else  if(index.user_type_id === 3){
    setUserRoleSelected("Customer")
   }
   else{
    setUserRoleSelected("Agent")
   }
   setStatusSelected(index.status)
   if(index.state){
    setState(index.state)
   }

   if(index.city){
    setCity(index.city)
   }
   
  }

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };


  const handleShowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  }

  function GenderFunction(e){
    setGenderSelected(e.target.value)
   }

 function UserRoleFunction(e){
  setUserRoleSelected(e.target.value)
 }

 function StatusFunction(e){
  setStatusSelected(e.target.value)
 }

 const [error, setError] = useState("");

  const AddUserFunction = async (event) => {
    event.preventDefault();
    console.log(selectedUserRole.id)
if(Password === ConfirmPassword){

 
    const validToken = localStorage.getItem("loginToken")
  
    const obj = {
      "email": EmailId,
      "password": Password,
      "first_name": FirstName,
      "last_name": LastName,
      "user_type_id": selectedUserRole.id,
      "gender":GenderSelected,
      "status":"Active",
      "mobile":""
  }
  console.log(obj)

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/admin/add-user`, obj, {
         headers: {
          'Authorization': 'Bearer ' + validToken
        }
      });
      console.log(response);
    setError('')
     setRefresh(true)
    } catch (error) {
      console.log(error);
      
    }
  
  
}
else{
  setError("Password and confirm password doesn't match")
}
  }

  const EditUserFunction = async (event) => {
    event.preventDefault();
    //  console.log(FirstName,LastName,
    //   EmailId,GenderSelected,
    //   Password,ConfirmPassword,
    //   UserRoleSelected,StatusSelected,
    //   State,City)
    const validToken = localStorage.getItem("loginToken")


 
    const obj = {
      "email": EmailId,
      "first_name": FirstName,
      "last_name": LastName,
      "user_type_id": selectedUserRole.id,
      "gender":GenderSelected,
      "status":StatusSelected,
      "mobile":""
  }
  console.log(obj)
    try {
      const response = await axios.put(`${process.env.REACT_APP_URL}/admin/edit-user/${UserId}`, obj, {
        headers: {
          'Authorization': 'Bearer ' + validToken
        }
      });
      console.log(response);
      setRefresh(true)
      setError('')
    } catch (error) {
      console.error(error);
      
    }
  
 

  }
  
  const tdStyle={
    padding: '5px',
    verticalAlign: 'middle',
    borderTop: '1px solid #dee2e6',
    textAlign: 'center',
}
    return (
        <>
        <div className='d-flex justify-content-between align-items-center'>

            <Breadcrumb title='Property List' titleText=' ' />
            <Link  href="/admin/portalManagement/propertyList/AddProperty" className='buttonUi'  >
                Add User
              </Link>
        </div>
            <Container fluid={true}>
           
            <Card style={{overflowX:'auto'}}>
                <CardBody style={{padding:0}}>
                <div className="recent-properties">
                   <DatatableWrapper
                   
      body={PortalAdministrationData}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 5,
          options: [5, 10, 15, 20]
        }
      }}
    >

{/* <div className="d-flex justify-content-between align-items-center mb-3">
            <h3></h3>

            <div className="d-flex align-items-center">
            <div
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end mr-5"
        >
          <Filter className="SearchClear" placeholder='Search'  />
        </div>
              
             
            </div>
          </div> */}
          
        <Table>
        <TableHeader style={{color:'#40485d'}} />
        <TableBody />
       
      </Table>

      
      <div className="d-flex justify-content-between align-items-center">


<div
    xs={12}
    sm={6}
    lg={4}
    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
    style={{padding:'10px'}}
 >
    <PaginationOptions />
  </div>

  <div
    xs={12}
    sm={6}
    lg={4}
    className="float-right"
    style={{padding:'10px'}}
  >
    <Pagination style={{float:'right'}} />
  </div>
</div>
            </DatatableWrapper>
            
            </div>
                    </CardBody>
                    </Card>
                    
               
            </Container>
             {/* ADD USER START */}
          

          {/* ADD USER END */}
          
       

     
   
        </>
    )
}

export default PropertyList

