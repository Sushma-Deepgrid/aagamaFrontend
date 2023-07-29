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
const TaskManagement = () => {
    const [tableData,settableData]=useState([])
    const STORY_HEADERS = [
        {
          prop: "service_name",
          title: "Service Name",
          isFilterable: true,
          
        },
        {
          prop: 'user.email',
          title: 'Customer Email',
          isFilterable: true,
          cell: (item) => item.user.email
         
        },
        {
          prop: 'package.package_name',
          title: 'Package',
          isFilterable: true,
          cell: (item) => item.package.package_name
         
        },
          {
            prop: "property.property_name",
            title: "Property Name",
            isFilterable: true,
            cell: (item) => item.property.property_name
          },
          
          {
            prop: "assigned_date",
            title: "Assigned Date",
            cell: (item) => {
             
                const date_object = new Date(item.assigned_date);
                const year = date_object.getFullYear();
                const month = (date_object.getMonth() + 1).toString().padStart(2, '0');
                const day = date_object.getDate().toString().padStart(2, '0');
                const formatted_date = `${day}-${month}-${year}`;
          
                return <div>
                   {item.assigned_date != null &&
                  formatted_date
                   }</div>;
              
            },
            
          },
          {
              prop: "agent_name",
              title: "Assigned To"
              
            },
            {
              prop: "status",
              title: "Status",
              cell: (item) => {
                
                if (item.agent_name === null) {
                  return "Not assigned";
                } else {
                  return item.status;
                }
              },
            }
        ];

        useEffect(() => {
  
            async function fetchTrackApiData() {
              const validToken = localStorage.getItem("loginToken")
              console.log(`'Authorization': 'Bearer ' + ${validToken}`)
              try {
                const response = await axios.get(
                  `https://aagama2.adgrid.in/user/get-tasks`,
                  { headers: {
                    'Authorization': 'Bearer ' + validToken
                  }}
                );
        
                await console.log(response.data.tasks,"tasksssssssssssss");
          
                settableData(response.data.tasks.reverse())
                
              } catch (error) {
                await console.error(error);
                // window.alert("Can't Assign Same Track Name")
              }
            }
            fetchTrackApiData();
          }, [1]);
    return (
        <>
            <Breadcrumb title='Task Mangement' titleText=' ' />
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
        </>
    )
}

export default TaskManagement

