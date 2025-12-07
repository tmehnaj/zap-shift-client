import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About/About"
import Loader from "../Components/Loader";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import Success from "../pages/Dashboard/Payment/Success";
import Cancelled from "../pages/Dashboard/Payment/Cancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/Approveriders/ApproveRiders";
import BeRider from "../pages/BeRider/BeRider";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        hydrateFallbackElement: <Loader></Loader>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: "be-rider",
                loader: ()=>fetch('/stores.json').then(res=>res.json()),
                element: <PrivateRoute>
                    <BeRider></BeRider>
                </PrivateRoute>
            },
            {
                path:"send-parcel",
                loader: ()=>fetch('/stores.json').then(res=>res.json()),
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>
            },
            {
                path: 'parcel-track/:trackingId',
                element: <ParcelTrack></ParcelTrack>
            },
            {
                path: "coverage",
                element: <Coverage></Coverage>,
                loader: ()=>fetch('/stores.json').then(res=>res.json()),
            },
            {
                path: "about",
                element: <About></About>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children:[
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children:[
            {
                path: "my-parcels",
                element: <MyParcels></MyParcels>
            },
            {
                path: "parcels/:parcelId",
                element: <Payment></Payment>
            },
            {
                path:  "payment-success",
                element: <Success></Success>
            },
            {
                path: "payment-cancelled",
                element: <Cancelled></Cancelled>
            },
            {
                path: "payments",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'approve-riders',
                element: <AdminRoute>
                    <ApproveRiders></ApproveRiders>
                </AdminRoute>
            },
             {
                path: 'assign-riders',
                element:<AdminRoute>
                     <AssignRiders></AssignRiders>
                </AdminRoute>
            },
            {
                path: 'users-management',
                element:<AdminRoute>
                     <UsersManagement></UsersManagement>
                </AdminRoute>
            },
            {
                path: 'assigned-deliveries',
                element: <RiderRoute>
                    <AssignedDeliveries></AssignedDeliveries>
                </RiderRoute>
            },
              {
                path: 'completed-deliveries',
                element: <RiderRoute>
                    <CompletedDeliveries></CompletedDeliveries>
                </RiderRoute>
            }
        ]
    }
])