import "./domainserver.css"
const DomainServer =async()=>{
    const url = "http://127.0.0.1:3001/api/readf/user1"
    const res = await fetch(url)
    const data = await res.json()
    return <div>
        {data.map((e:any)=>(
            <div key={e.filename} className="domaincon">
                <div className="domainname"><h1>{e.filename}</h1></div>
                <form action="" method="get"><button type="submit">Setting</button></form>
            </div>
        ))}
    </div>
}
export default DomainServer