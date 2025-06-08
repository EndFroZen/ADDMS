'use client'

import Openfile from "./file"

export default function Overview({ web }: { web: string }) {
    let newWeb = web
    return (
        <div className="">
            <div className="">{web}</div>
            <div className="flex gap-1">
                <div className="hover:bg-orange-800" onClick={()=>{}}>File</div>
                <div className="hover:bg-orange-800">Database</div>
                <div className="hover:bg-orange-800">Setting</div>
            </div>
            <Openfile path={newWeb}/>
        </div>

    )
}
