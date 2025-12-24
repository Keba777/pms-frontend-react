import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";

// Master Schedule Pages
import MasterSchedulePage from "@/pages/master-schedule";
import ProjectDetailsPage from "@/pages/master-schedule/ProjectDetails";
import TaskDetailsPage from "@/pages/master-schedule/TaskDetails";

// Activity Pages
import ActivitiesPage from "@/pages/activities";
import ActivityDetailsPage from "@/pages/activities/ActivityDetails";

// Finance Pages
import BudgetsPage from "@/pages/finance/Budgets";
import InvoicesPage from "@/pages/finance/Invoices";
import PaymentsPage from "@/pages/finance/Payments";
import PayrollsPage from "@/pages/finance/Payrolls";

// Project Pages
import ProjectPage from "@/pages/projects";
import ProjectDetails from "@/pages/projects/ProjectDetails";
import FavoriteProjectPage from "@/pages/projects/FavoriteProjects";

// Request Pages
import RequestsPage from "@/pages/requests";
import EquipmentsRequestPage from "@/pages/requests/Equipments";
import LaborsRequestPage from "@/pages/requests/Labors";
import MaterialsRequestPage from "@/pages/requests/Materials";
import RequestDetailsPage from "@/pages/requests/RequestDetails";

// Request Approval & Delivery
import RequestApprovalPage from "@/pages/requests/RequestApproval";
import RequestDeliveryListPage from "@/pages/requests/RequestDeliveryList";
import RequestDeliveryDetailsPage from "@/pages/requests/RequestDeliveryDetails";

// Users & Roles
import UsersPage from "@/pages/users/UsersPage";
import UserProfile from "@/pages/users/UserProfile";
import CreateRole from "@/pages/roles/CreateRole";
import EditRole from "@/pages/roles/EditRole";

// Admin / Misc
import HrmPage from "@/pages/hrm/HrmPage";
import MyWarehousePage from "@/pages/mywarehouse/MyWarehousePage";
import StoreRequisitionList from "@/pages/store-requisition/StoreRequisitionList";
import StoreRequisitionDetails from "@/pages/store-requisition/StoreRequisitionDetails";

// Resources
import ResourceEquipmentsPage from "@/pages/resources/ResourceEquipmentsPage";
import ResourceLaborsPage from "@/pages/resources/ResourceLaborsPage";
import ResourceMaterialsPage from "@/pages/resources/ResourceMaterialsPage";
import ActivityResourcesPage from "@/pages/resources/ActivityResourcesPage";

// Notifications & Profile
import NotificationPage from "@/pages/notifications/NotificationPage";
import ProfilePage from "@/pages/profile/ProfilePage";

// Settings
import SettingsPage from "@/pages/settings/SettingsPage";
import LanguageSettings from "@/pages/settings/LanguageSettings";
import PermissionsPage from "@/pages/settings/PermissionsPage";

// Batch 5: Collaboration, Core, & Tasks
import ChatPage from "@/pages/chat/ChatPage";
import GroupChatPage from "@/pages/chat/GroupChatPage";
import ClientsPage from "@/pages/clients/ClientsPage";
import DepartmentsPage from "@/pages/departments/DepartmentsPage";
import SitesPage from "@/pages/sites/SitesPage";
import SchedulePage from "@/pages/schedule/SchedulePage";
import TasksPage from "@/pages/tasks/TasksPage";
import TodosPage from "@/pages/todos/TodosPage";
import IssuesPage from "@/pages/issues/IssuesPage";
import AnnouncementsPage from "@/pages/announcements/AnnouncementsPage";
import MeetingsPage from "@/pages/meetings/MeetingsPage";
import ActivityLogPage from "@/pages/activity-log/ActivityLogPage";

// Batch 6: Operations & Reports
import DispatchesPage from "@/pages/dispatches/DispatchesPage";
import LeaveRequestsPage from "@/pages/leave-requests/LeaveRequestsPage";
import KpisPage from "@/pages/kpis/KpisPage";
import ResourceAllocationPage from "@/pages/resource-allocation/ResourceAllocationPage";
import StatusPage from "@/pages/status/StatusPage";
import WorkspacesPage from "@/pages/workspaces/WorkspacesPage";
import TaskReportsPage from "@/pages/taskreports/TaskReportsPage";
import ResetPasswordPage from "@/pages/reset-password/ResetPasswordPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Dashboard />} />

                {/* Master Schedule */}
                <Route path="/master-schedule" element={<MasterSchedulePage />} />
                <Route path="/master-schedule/project/:projectId" element={<ProjectDetailsPage />} />
                <Route path="/master-schedule/task/:taskId" element={<TaskDetailsPage />} />

                {/* Activities */}
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetailsPage />} />

                {/* Finance */}
                <Route path="/finance/budgets" element={<BudgetsPage />} />
                <Route path="/finance/invoices" element={<InvoicesPage />} />
                <Route path="/finance/payments" element={<PaymentsPage />} />
                <Route path="/finance/payrolls" element={<PayrollsPage />} />

                {/* Projects */}
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/projects/favorite" element={<FavoriteProjectPage />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />

                {/* Requests */}
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/requests/equipments" element={<EquipmentsRequestPage />} />
                <Route path="/requests/labors" element={<LaborsRequestPage />} />
                <Route path="/requests/materials" element={<MaterialsRequestPage />} />
                <Route path="/requests/:id" element={<RequestDetailsPage />} />

                {/* Approvals */}
                <Route path="/request-approval" element={<RequestApprovalPage />} />

                {/* Deliveries */}
                <Route path="/request-delivery" element={<RequestDeliveryListPage />} />
                <Route path="/request-delivery/:id" element={<RequestDeliveryDetailsPage />} />

                {/* Users & Roles */}
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/profile/:id" element={<UserProfile />} />
                <Route path="/roles/create" element={<CreateRole />} />
                <Route path="/roles/edit/:id" element={<EditRole />} />

                {/* HRM */}
                <Route path="/hrm" element={<HrmPage />} />

                {/* Warehouse */}
                <Route path="/mywarehouse" element={<MyWarehousePage />} />

                {/* Store Requisition */}
                <Route path="/store-requisition" element={<StoreRequisitionList />} />
                <Route path="/store-requisition/:id" element={<StoreRequisitionDetails />} />

                {/* Resources */}
                <Route path="/resources/equipments" element={<ResourceEquipmentsPage />} />
                <Route path="/resources/labors" element={<ResourceLaborsPage />} />
                <Route path="/resources/materials" element={<ResourceMaterialsPage />} />
                <Route path="/resources/:activityId" element={<ActivityResourcesPage />} />

                {/* Notifications & Profile */}
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Settings */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/languages" element={<LanguageSettings />} />
                <Route path="/settings/permissions" element={<PermissionsPage />} />

                {/* Batch 5: Collaboration */}
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/group-chat" element={<GroupChatPage />} />

                {/* Batch 5: Core */}
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/sites" element={<SitesPage />} />
                {/* Note: Site details not found in source, assuming dynamic or handled in list? */}
                {/* <Route path="/sites/:id" element={<SiteDetailsPage />} /> */}

                {/* Batch 5: Tasks & Schedule */}
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/meetings" element={<MeetingsPage />} />
                <Route path="/activity-log" element={<ActivityLogPage />} />

                {/* Batch 6: Operations & Reports */}
                <Route path="/dispatches" element={<DispatchesPage />} />
                <Route path="/leave-requests" element={<LeaveRequestsPage />} />
                <Route path="/kpis" element={<KpisPage />} />
                <Route path="/resource-allocation" element={<ResourceAllocationPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/workspaces" element={<WorkspacesPage />} />
                <Route path="/taskreports" element={<TaskReportsPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
