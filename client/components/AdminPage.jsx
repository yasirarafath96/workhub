import { useEffect, useState } from "react";
import UserCard from "./UserCard"
import { GetAllProjects, GetAllTasks, GetAllUsers } from "@/api/queries/user";

const Adminpage = () => {
    const [counts, setCounts] = useState({ project: 0, task: 0, user: 0, report: 0, issue: 0 });

    useEffect(() => {
        const fetchTasks = async () => {
            const { data: allTask } = await GetAllTasks();
            const { data: allUser } = await GetAllUsers();
            const { data: allProject } = await GetAllProjects();
            setCounts({
                project: allProject?.length || 0,
                task: allTask?.length || 0,
                user: allUser?.users?.length || 0,
                report: 0, // placeholder until real API
                issue: 0,  // placeholder until real API
            });
            console.log('allTask', allTask.length);
            console.log('allUser', allUser.users.length);
            console.log('allProject', allProject.length);

        };
        fetchTasks();
    }, []);

    return (
        <>
            <div className="flex p-4 gap-4 flex-col md:flex-row">
                {/* LEFT */}
                <div className="w-full lg:w-2/3">
                    {/* USER CARDS */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <UserCard type="Users" count={counts.user || "-"} />
                        <UserCard type="Projects" count={counts.project || "-"} />
                        <UserCard type="Tasks" count={counts.task || "-"} />
                        <UserCard type="Reports" count={counts.report || "-"} />
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