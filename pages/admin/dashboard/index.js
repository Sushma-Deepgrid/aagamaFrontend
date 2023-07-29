import React,{useState,useEffect} from 'react'
import {  Card, CardBody, Container,Table } from 'reactstrap'
import Breadcrumb from '../../../components/Common/Breadcrumb'
import Assigness from '../../../components/dashboard/Assigness'
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
  } from "react-bs-datatable";
import axios from 'axios';
const AdminDashboard = () => {
    const [tableData,settableData]=useState([])
    const STORY_HEADERS = [
      {
        prop: "user_id",
        title: "User Id",
        isFilterable: true
      },{
          prop: "user_email",
          title: "User Email",
          isFilterable: true
        },
        {
          prop: "property_name",
          title: "Property Name",
          isFilterable: true
        },
        {
          prop: 'package_name',
          title: 'Package',
          isFilterable: true,
         
        },
        {
          prop: "subscription_start_date",
          title: "Subscription Start Date",
          cell: (item) => {
            const date_object = new Date(item.subscription_start_date);
            const year = date_object.getFullYear();
            const month = (date_object.getMonth() + 1).toString().padStart(2, '0');
            const day = date_object.getDate().toString().padStart(2, '0');
            const formatted_date = `${day}-${month}-${year}`;
      
            return <div>
              {
                item.subscription_start_date !=null &&
                formatted_date
              }
              </div>;
          },
          isSortable: true
        },
        {
          prop: "subscription_end_date",
          title: "Subscription End Date",
          cell: (item) => {
            const date_object = new Date(item.subscription_end_date);
            const year = date_object.getFullYear();
            const month = (date_object.getMonth() + 1).toString().padStart(2, '0');
            const day = date_object.getDate().toString().padStart(2, '0');
            const formatted_date = `${day}-${month}-${year}`;
      
            return <div>
              {
                item.subscription_end_date !=null &&
                formatted_date
              }
              </div>;
          },
          isSortable: true
        },
        {
          prop: "status",
          title: "Status",
          isSortable: true
        }
      ];

        useEffect(() => {
  
            async function fetchTrackApiData() {
              const validToken = localStorage.getItem("loginToken")
              console.log(`'Authorization': 'Bearer ' + ${validToken}`)
              try {
                const response = await axios.get(
                  `https://aagama2.adgrid.in/admin/dashboard`,
                  { headers: {
                    'Authorization': 'Bearer ' + validToken
                  }}
                );
        
                await console.log(response.data.properties,"tasksssssssssssss");
          
                settableData(response.data.properties.reverse())
                
              } catch (error) {
                await console.error(error);
                // window.alert("Can't Assign Same Track Name")
              }
            }
            fetchTrackApiData();
          }, [1]);
    return (
        <>
            <Breadcrumb title='Dashboard' titleText=' ' />
            <Container fluid={true}>
           
            <Card style={{overflowX:'auto'}}>
                <CardBody style={{padding:0}}>
                <div className="recent-properties">
                   <DatatableWrapper
                   
      body={tableData}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 5,
          options: [5, 10, 15, 20]
        }
      }}
    >
          
        <Table>
        <TableHeader style={{color:'#40485d'}} />
        <TableBody />
       
      </Table>

      
      <div className="d-flex justify-content-between align-items-center">


<div
    
    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
    style={{padding:'10px'}}
 >
    <PaginationOptions />
  </div>

  <div
   
    className="float-right "
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
        </>
    )
}

export default AdminDashboard

