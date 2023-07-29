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
const UserRole = () => {
    
 
  const router = useRouter();

  const [UserRoleData, setUserRoleData] = useState([]);
  const FILTER_OPTIONS = [
    {
      prop: "user_type_name",
      title: "UserRole",
      isFilterable: true,
    },
    {
      prop: "user_type_permissions.permission",
      title: "Data Rights",
      cell: (row) => (
        <div>
          {row.user_type_permissions.map((data, index) => (
            <span key={index}>
              {data.permission.permission_name} - 
              
              {
                (data.is_view === 1 && data.is_edit === 1 && 
                  data.is_delete === 1 && data.is_add === 1 ) ? 
                    <span>
                      All
                    </span>
                    :
                    <div>
                     {
                data.is_view === 1 &&
                <span>
                  {
                    (data.is_edit === 1 ||  data.is_delete === 1 || data.is_add === 1) ?
                    <div>
                    View,
                    </div>
                    :
                    <div>
                      View
                    </div>
                  }
                 
                </span>
              }
              
              {
                data.is_edit === 1 &&
                <span>
                  {
                    (data.is_view === 1 ||  data.is_delete === 1 || data.is_add === 1) ?
                    <div>
                    Edit,
                    </div>
                    :
                    <div>
                      Edit
                    </div>
                  }
                </span>
              }


              {
                data.is_delete === 1 &&
                <span>
                  {
                    (data.is_view === 1 ||  data.is_edit === 1 || data.is_add === 1) ?
                    <div>
                    Delete,
                    </div>
                    :
                    <div>
                      Delete
                    </div>
                  }
                </span>
              }
             
              {
                data.is_add === 1 &&
                <span>
                   Add
                </span>
              }
                    </div>
              }

              {index === row.user_type_permissions.length - 1 ? "" : <br/> }
            </span>
          ))}
        </div>
      ),
      isFilterable: true,
    },
    {
      prop: "status",
      title: "Status",
      isSortable: true,
    },
    {
      prop: "actions",
      title: "Actions",
      cell: (index) => (
        <div className="App">
          <UncontrolledDropdown style={{marginTop:'-11%'}}>
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
              <DropdownItem
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#EditRolesPopup"
                onClick={()=>{
                  console.log(index)
                  localStorage.setItem("EditRoleArray",JSON.stringify(index))
                  router.push('/admin/portalAdministration/UserRole/EditRole');
                  }}>
                Edit Role
              </DropdownItem>
              
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
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
 
 

 
  const [refresh, setRefresh] = useState(false);
 
  useEffect(() => {
   
    async function fetchTrackApiData() {
      const validToken = localStorage.getItem("loginToken")
      console.log(`'Authorization': 'Bearer ' + ${validToken}`)
      
      try {
        const response = await axios.get(
          `https://aagama2.adgrid.in/admin/user-types`,
          { headers: {
            'Authorization': 'Bearer ' + validToken
          }}
        );

        await console.log(response.data);
      
    setUserRoleData(response.data.userTypes)

      } catch (error) {
        await console.error(error);
        // window.alert("Can't Assign Same Track Name")
      }
    }
    fetchTrackApiData();
  }, [refresh]);



    return (
        <>
        <div className='d-flex justify-content-between align-items-center'>

            <Breadcrumb title='User Role' titleText=' ' />
            <Link  href="/admin/portalAdministration/UserRole/AddRole" className='buttonUi'  >
                Add Role
              </Link>
        </div>
            <Container fluid={true}>
           
            <Card style={{overflowX:'auto'}}>
                <CardBody style={{padding:0}}>
                <div className="recent-properties">
                   <DatatableWrapper
                   
      body={UserRoleData}
      headers={FILTER_OPTIONS}
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

export default UserRole

