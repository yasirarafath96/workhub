import UserCard from "./UserCard"

const Adminpage = () => {
    return (
        <>
            <div className="flex p-4 gap-4 flex-col md:flex-row">
                {/* LEFT */}
                <div className="w-full lg:w-2/3">
                    {/* USER CARDS */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <UserCard type='Projects' />
                        <UserCard type='Tasks' />
                        <UserCard type='Reports' />
                        <UserCard type='Issues' />
                    </div>
                    <div>
                        {/* <CountChart /> */}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-1/3">
                    r
                </div>
            </div>
        </>
    )
}

export default Adminpage