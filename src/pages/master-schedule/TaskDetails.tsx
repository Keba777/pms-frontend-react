import React, { useState } from "react";
import { useTask } from "@/hooks/useTasks";
import ActivityTable from "@/components/master-schedule/ActivityTable";
import ActualActivityTable from "@/components/master-schedule/ActualActivityTable";
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Transition,
} from "@headlessui/react";
import { ChevronDown, FileDown } from "lucide-react";
import type { Activity, CreateActivityInput } from "@/types/activity";
import GenericDownloads, { type Column } from "@/components/common/GenericDownloads";
import GenericImport, { type ImportColumn } from "@/components/common/GenericImport";
import { toast } from "react-toastify";
import { formatDate, getDateDuration } from "@/utils/helper";
import { useCreateActivity } from "@/hooks/useActivities";
import { useParams } from "react-router-dom";

const TaskDetailsPage: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const { data: task, isLoading, isError } = useTask(taskId || "");
    const { mutate: createActivity } = useCreateActivity();

    const [activeTab, setActiveTab] = useState<"planned" | "actual">("planned");

    if (isLoading) return <div>Loading task...</div>;
    if (isError || !task) return <div>Error loading task.</div>;

    const activities = task.activities || [];

    const plannedColumns: Column<Activity>[] = [
        { header: "Activity Name", accessor: "activity_name" },
        {
            header: "Start Date",
            accessor: (a) => formatDate(a.start_date),
        },
        {
            header: "End Date",
            accessor: (a) => formatDate(a.end_date),
        },
        {
            header: "Duration",
            accessor: (a) => getDateDuration(a.start_date, a.end_date).toString(),
        },
        { header: "Status", accessor: "status" },
    ];

    const actualColumns: Column<Activity>[] = [
        { header: "Activity Name", accessor: "activity_name" },
        {
            header: "Actual Start",
            accessor: (a) =>
                a.actuals?.start_date ? formatDate(a.actuals.start_date) : "-",
        },
        {
            header: "Actual End",
            accessor: (a) =>
                a.actuals?.end_date ? formatDate(a.actuals.end_date) : "-",
        },
        {
            header: "Progress",
            accessor: (a) => (a.actuals?.progress ? `${a.actuals.progress}%` : "0%"),
        },
    ];

    const importColumns: ImportColumn<any>[] = [
        { header: "Activity Name", accessor: "activity_name" },
        { header: "Start Date (YYYY-MM-DD)", accessor: "start_date", type: "date" },
        { header: "End Date (YYYY-MM-DD)", accessor: "end_date", type: "date" },
        { header: "Unit", accessor: "unit" },
        { header: "Quantity", accessor: "quantity", type: "number" },
    ];

    const handleActivityImport = (data: any[]) => {
        // Mapping data to CreateActivityInput
        const mappedData: CreateActivityInput[] = data.map((d) => ({
            task_id: taskId || "",
            activity_name: d.activity_name,
            start_date: new Date(d.start_date),
            end_date: new Date(d.end_date),
            unit: d.unit,
            quantity: Number(d.quantity),
            progress: 0,
            status: "Not Started",
            approvalStatus: "Pending",
            priority: "Medium", // Default
        }));

        mappedData.forEach(async (act) => {
            createActivity(act, {
                onSuccess: () => toast.success(`Imported ${act.activity_name}`),
                onError: () => toast.error(`Failed ${act.activity_name}`)
            })
        })
    };

    const handleError = (msg: string) => {
        toast.error(msg);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{task.task_name}</h1>
                    <p className="text-gray-500">Project: {task.project?.title}</p>
                </div>

                <div className="flex gap-2">
                    <GenericImport
                        expectedColumns={importColumns}
                        onImport={handleActivityImport}
                        onError={handleError}
                        title="Activities"
                    />
                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 shadow-sm transition-all duration-200">
                            <FileDown className="w-5 h-5 mr-2" aria-hidden="true" />
                            Download
                            <ChevronDown
                                className="w-5 h-5 ml-2 -mr-1 text-green-200 hover:text-green-100"
                                aria-hidden="true"
                            />
                        </MenuButton>
                        <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className="px-1 py-1">
                                    <MenuItem>
                                        {({ active }) => (
                                            <div className={`${active ? "bg-gray-100" : ""}`}>
                                                <GenericDownloads<Activity>
                                                    data={activities}
                                                    title={`Activities - ${task.task_name}`}
                                                    columns={plannedColumns}
                                                    secondTable={{
                                                        data: activities,
                                                        title: "Actuals",
                                                        columns: actualColumns,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-4">
                    <button
                        onClick={() => setActiveTab("planned")}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "planned"
                            ? "border-b-2 border-emerald-600 text-emerald-600"
                            : "text-gray-600 hover:text-gray-800"
                            }`}
                    >
                        Planned
                    </button>
                    <button
                        onClick={() => setActiveTab("actual")}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "actual"
                            ? "border-b-2 border-emerald-600 text-emerald-600"
                            : "text-gray-600 hover:text-gray-800"
                            }`}
                    >
                        Actual
                    </button>
                </nav>
            </div>

            {activeTab === "planned" ? (
                <ActivityTable filteredActivities={activities} taskId={task.id} />
            ) : (
                <ActualActivityTable />
            )}
        </div>
    );
};

export default TaskDetailsPage;
