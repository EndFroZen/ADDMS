import DomainServer from "./addOn/domainserver"

const DashboardPage =async()=>{
    return <body>
        <div className="maincon">
            <div className="box1">
                <h1>EndFroZen</h1>
                <form action="/create" method="get"><button type="submit">Create</button></form>
            </div>
            <div className="box2">
                <DomainServer />
            </div>
        </div>
    </body>
}
export default DashboardPage