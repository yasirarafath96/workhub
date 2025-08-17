import { EllipsisVertical } from "lucide-react"

const UserCard = ({ item, type, count }) => {
    return (
        <div className="flex bg-amber-200 flex-1 rounded-2xl p-4 flex-col even:bg-blue-300 odd:bg-red-300">
            <div className="flex-row justify-between flex pb-2">
                <span className="text-black">2025/08</span>
                <EllipsisVertical color="black" onClick={() => console.log(type)}/>
            </div>
            <h1 className="text-black">{count}</h1>
            <p className="text-black">{type}</p>
        </div>
    )
}

export default UserCard