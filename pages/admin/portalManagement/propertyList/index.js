import React from 'react'
import { Container } from 'reactstrap'
import PropertyList from '../../../../components/admin/portalManagement/PropertyList/propertyList'


const Dashboard = () => {
    return (
        <>
            <Container fluid={true}>
                <div className="row">
                    <PropertyList />
                    
                </div>
            </Container>
        </>
    )
}

export default Dashboard
